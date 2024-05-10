import dotenv from "dotenv"
dotenv.config();    
import pool from './db.js'
// import multer from 'multer'
import { getObjectSignedUrl, uploadFile, deleteFile } from "./utils/s3.js"
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { nanoid } from 'nanoid'

const uploadRoomImage = async (req, res) => {
    let conn
    try{
        conn = await pool.getConnection()
        const file = req.file
        const { room_id } = req.body
        const imageName = nanoid(32)

        //with processing
        // const fileBuffer = await sharp(file.buffer)
        // .resize({ height: 1920, width: 1080, fit: "contain" })
        // .toBuffer()

        //without processing
        const fileBuffer = file.buffer

        await uploadFile(fileBuffer, imageName, file.mimetype)
        await conn.beginTransaction()
        //save to SQL database
        const insertQuery = "INSERT INTO room_file(room_id, file_path) VALUES (?,?)"
        await conn.query(insertQuery,[room_id, imageName])
        await conn.commit()
        res.send({success:true, msg:"Successfully added"})
    }catch(e){
        await conn.rollback()
        console.log(`Failed to upload: ${e}`)
        res.send({success:false, msg:"Server Error: Cannot upload image"})
    }finally{
        if (conn) conn.release();
    } 
}

//images is ordered by latest to oldest
const getRoomImage = async (req,res) => { 
    let conn
    try{
        conn = await pool.getConnection()
        const { room_id } = req.body

        //get all room images
        const getQuery = "SELECT * FROM room_file WHERE room_id = ? ORDER BY date_created DESC"
        const images = await conn.query(getQuery,[room_id])
        let listOfImages = []

        for (let image of images){
            console.log(image)
            let url = await getObjectSignedUrl(image.file_path)
            listOfImages.push(url)
        }
        res.send({success:true, images: listOfImages})
    }catch(e){
        console.log(`Failed to upload: ${e}`)
        res.send({success:false, msg:"Server Error: Cannot get images"})
    }finally{
        if (conn) conn.release();
    } 
}
export {uploadRoomImage, getRoomImage}