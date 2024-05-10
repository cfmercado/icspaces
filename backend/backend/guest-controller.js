import dotenv from "dotenv"
dotenv.config()
import pool from "./db.js"

import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'

let configMailerOptions = {
    host: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL, // Your Gmail address
        pass: process.env.SMTP_PASWORD // Your App Password
    }
}

const addGuestReservation = async (req, res) => {
    let conn
    try {
        conn = await pool.getConnection()
        const { fname, lname, email, activity_name, activity_desc, room_id, user_id, date_created, start_datetime, end_datetime, discount, additional_fee, total_amount_due, status_code, utilities } = req.body
        
        //Add guest with new transactionid
        const transaction_id = uuidv4()
        const addGuestResult = await conn.query(`INSERT INTO guest(transaction_id, reservation_id, fname, lname, email) VALUES(?,?,?,?)`,[transaction_id, null, fname, lname, email])

        var query = `INSERT INTO reservation(
            activity_name,
            activity_desc, 
            room_id, 
            user_id, 
            date_created,
            start_datetime,
            end_datetime,
            discount,
            additional_fee,
            total_amount_due,
            status_code
        ) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
        const values = [activity_name, activity_desc, room_id, user_id, date_created, start_datetime, end_datetime, discount, additional_fee, total_amount_due, status_code]
        
        // Execute query
        const result = await conn.query(query, values)

        //insert utilities if there is any
        if (utilities.length !== 0) {
            for (const utility of utilities) {
                const { utility_id, reserved_quantity, running_total } = utility;
                const utilityInsertQuery = `INSERT INTO reservation_utility(reservation_id, utility_id, reserved_quantity, running_total) VALUES(?,?,?,?)`;
                const utilityInsertValues = [result.insertId, utility_id, reserved_quantity, running_total];
                await conn.query(utilityInsertQuery, utilityInsertValues);
            }
        }

        // Insert into reservation_notification table and get the reservation_id from previous query
        const insertnotifResult = await conn.query(`INSERT INTO reservation_notification(reservation_id, actor_id, status_code, date_created) VALUES(?,?,?,?)`, [result.insertId, user_id, status_code, date_created])

        // update guest reservation id
        const updateGuestResult = await conn.query(`UPDATE guest SET reservation_id = ? WHERE transaction_id = ?`,[result.insertId, transaction_id])

        //add nodemailer here to mail the appropriate guest
        const mailOptions = {
            from: process.env.SMTP_EMAIL, // Sender address (your Gmail address)
            to: email, // Recipient address
            subject: 'ICSpaces Room Reservation', // Email subject
            text: `Congratulations ${fname} ${lname} your ${activity_name} have been succesfully added! Please communicate with the appropriate staff at ${process.env.SMTP_EMAIL} for further concerns` // Email content (plain text)
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.send({success:true, transaction_id: transaction_id, message: "Successfully added reservation." });
    } catch (err) {
        console.log(err);
        res.send({errmsg: "Failed to add reservation", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const trackGuestReservation = async (req, res) => {
    let conn
    try{
        conn = await pool.getConnection();
        const { transaction_id } = req.body;
        
    
        const guests = await conn.query("SELECT * FROM guest WHERE transaction_id = ?", [transaction_id]);
        if (guests.length === 0){
            res.send({status: false, msg: "Reservation no found"})
        }else{
            const resdetails = await conn.query("SELECT * FROM reservation WHERE user_id = ? and reservation_id = ?", [guests[0].email, guests[0].reservation_id])
        }
        
    }catch(e){
        console.log(`Error: ${e}`)
        res.send({errmsg: "Server Error: Failed to get Reservation", success: false });
    }finally {
        if (conn) conn.release();
    }
}

export { addGuestReservation, trackGuestReservation }