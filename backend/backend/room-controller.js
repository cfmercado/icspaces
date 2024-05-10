import pool from './db.js';



// Form: https://api.icspaces.online//search?type={TYPE}&room_id={ROOM_ID}
const searchHandler = async (req, res) => {
    const { type } = req.body;
    try {
        switch(type) {
            case 'id':
                return await searchRoomById(req, res);
            case 'name':
                return await searchRoomByName(req, res);
            case 'type':
                return await searchRoomByType(req, res);
            case 'capacity':
                return await searchRoomByCapacity(req, res);
            case 'capacity_range':
                return await searchRoomByCapacityRange(req, res);    
            case 'floor':
                return await searchRoomByFloor(req, res);
            default:
                return await getAllRoomsAndUtilities(req, res);
        }
    } catch (err) {
        console.error("Error in searchHandler:", err);
    } 
}

const searchRoomById = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { type, room_id } = req.body;

        const query = "SELECT * FROM room WHERE room_id = ?";
        let values = [room_id]
        const rows = await conn.query(query, values);
        res.send(rows);
    } catch (err) {
        res.send({errmsg: "Failed to search room by id", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const searchRoomByName = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { type, room_name } = req.body;

        //need to optimize

        const query = "SELECT * FROM room WHERE room_name LIKE ?";
        const searchvalue = `%${room_name}%`
 
        let values = [searchvalue]
        const rows = await conn.query(query, values);
        console.log(rows);
        res.send(rows);
    } catch (err) {
        res.send({errmsg: "Failed to search room by room name", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const searchRoomByType = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { type, room_type } = req.body;

        const query = "SELECT * FROM room WHERE room_type LIKE ?";
        const searchvalue = `%${room_type}%`

        const values = [searchvalue]
        const rows = await conn.query(query, values);

        res.send(rows);
    } catch (err) {
        res.send({errmsg: "Failed to search room by room type", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const searchRoomByCapacity = async (req, res) =>{
    let conn;
    try {
        conn = await pool.getConnection();
        const { type, room_capacity } = req.body;

        const query = `SELECT * FROM room WHERE room_capacity <= ?`;
        var values = [room_capacity]
        const rows = await conn.query(query, values);
        res.send(rows);
    } catch (err) {
        res.send({errmsg: "Failed to search room by room capacity", success: false });
    } finally {
        if (conn) conn.release();
    }
}


const searchRoomByCapacityRange = async (req, res) =>{
    let conn;
    try {
        conn = await pool.getConnection();
        const { type, upper_capacity, lower_capacity } = req.body;

        const query = `SELECT * FROM room WHERE room_capacity >= lower_capacity AND room_capacity <= upper_capacity`;
        var values = [upper_capacity, lower_capacity]
        const rows = await conn.query(query, values);
        res.send(rows);
    } catch (err) {
        res.send({errmsg: "Failed to search room by capacity range", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const searchRoomByFloor = async (req, res) =>{
    let conn;
    try {
        conn = await pool.getConnection();
        const { type, floor_number } = req.body;

        const query = `SELECT * FROM room WHERE floor_number = ?`;
        var values = [floor_number]
        const rows = await conn.query(query, values);
        res.send(rows);
    } catch (err) {
        res.send({errmsg: "Failed to search room by floor", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const getRoomInfo = async (req,res) => {
    let conn;
    try {
        conn = await pool.getConnection()
        const room_id= parseInt(req.body.room_id)
        var roomquery = `SELECT * FROM room WHERE room_id = ?`
        var roomvalues = [room_id]
        var roomrows = await conn.query(roomquery, roomvalues)
        var utilquery = `SELECT * FROM utility WHERE room_id = ?`
        var utilvalues = [room_id]
        var utilrows = await conn.query(utilquery, utilvalues)

        let result = {
            'room' : roomrows[0], 
            'utility': utilrows
        }
        res.send(result)
    } catch (err) {
        res.send({errmsg: "Failed to get room info by room ID", success: false });
    } finally {
        if (conn) conn.release();
    }
}


const getAllRoomsAndUtilities = async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rooms = await conn.query("SELECT * FROM room");
        const utilities = await conn.query("SELECT * FROM utility");

        // Map utilities to their respective rooms
        const roomsWithUtilities = rooms.map(room => {
            room.utilities = utilities.filter(utility => utility.room_id === room.room_id).map(utility => utility.item_name);
            return room;
        });

        res.send(roomsWithUtilities);
    } catch (err) {
        res.send({errmsg: "Failed to get rooms and utilities", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const getAllRooms = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `SELECT * FROM room`;
        const rows = await conn.query(query);
        res.send(rows);
    } catch (err) {
        res.send({errmsg: "Failed to get all rooms", success: false });
    } finally {
        if (conn) conn.release();
    }
}


const insertRoom = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_id, room_name, room_capacity, fee, room_type } = req.body
        
        var query = `INSERT INTO room(room_name, room_capacity, fee, room_type) VALUES(?,?,?,?)`;
        const values = [room_name, room_capacity, fee, room_type];
        
        var result = await conn.query(query, values);
        res.send(result);
    } catch (err) {
        res.send({errmsg: "Failed to insert room", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const setRoomClassSchedule = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { class_id, class_name, class_type, lecturer, class_section, start_date, end_date, time_start, time_end, room_id, class_days } = req.body;

        let query = `INSERT INTO class(class_id, class_name, class_type, lecturer, class_section, start_date, end_date, time_start, time_end, room_id) VALUES(?,?,?,?,?,?,?,?,?,?)`;
        let values = [class_id, class_name, class_type, lecturer, class_section, start_date, end_date, time_start, time_end, room_id];
        await conn.query(query, values);

        for (let day of class_days) {
            query = `INSERT INTO class_day(class_id, class_day) VALUES(?,?)`;
            values = [class_id, day];
            await conn.query(query, values);
        }

        res.send({ message: "Class schedule added successfully." });
    } catch (err) {
        console.error("Error in setRoomClassSchedule:", err);
        res.status(500).send({ message: "Error adding class schedule.", error: err.message });
    } finally {
        if (conn) conn.release();
    }
}

// set the edited information of a room
// input: "status_code", "room_name", "room_capacity", "fee", "room_type", "additional_fee_per_hour", "room_id"
const setEditedRoom = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_name, room_capacity, fee, room_type, additional_fee_per_hour, room_id } = req.body
        const query =  `UPDATE room SET 
        room_name = ?,
        room_capacity = ?,
        fee = ?,
        room_type = ?,
        additional_fee_per_hour = ?
        WHERE room_id = ?`;
        const values = [ room_name, room_capacity, fee, room_type, additional_fee_per_hour, room_id];
        await conn.query(query, values);
        res.send({ message: "Successfully edited room details." });
    } catch (err) {
        res.send({errmsg: "Failed to set edited information of a room", success: false });
    } finally {
        if (conn) conn.release();
    }
}

// adds utility to a room if it does not exist
// input: "room_id", "item_name", "item_qty"
const addUtility = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_id, item_name, item_qty, fee } = req.body

        // Check if the item already exists in the room
        const checkQuery = `SELECT * FROM utility WHERE room_id = ? AND item_name = ?`;
        const checkValues = [room_id, item_name];
        const rows = await conn.query(checkQuery, checkValues);

        if (rows.length > 0) {
            // send error message if existing
            res.status(400).send({ message: "Item already exists in the room." });
        } else {
            // add item if it does not exist yet
            const insertQuery = `INSERT INTO utility(room_id, item_name, item_qty, fee) VALUES(?,?,?,?)`;
            const insertValues = [room_id, item_name, item_qty, fee];
            await conn.query(insertQuery, insertValues);
            res.send({ message: "Successfully added utility." });
        }
    } catch (err) {
        res.send({errmsg: "Failed to add utility", success: false });
    } finally {
        if (conn) conn.release();
    }
}

// deletes utility from a room
// input: "room_id", "item_name"
const deleteUtility = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_id, item_name } = req.body

        // Check if the utility exists
        const result = await conn.query(`SELECT * FROM utility WHERE room_id = ? AND item_name = ?`, [room_id, item_name]);
        const rows = result[0];
        if (!rows || rows.length === 0) {
            res.status(404).send({ message: "Utility not found." });
            return;
        }

        // Delete the utility
        const query = `DELETE FROM utility WHERE room_id = ? AND item_name = ?`;
        const values = [ room_id, item_name ];
        await conn.query(query, values);
        res.send({ message: "Successfully deleted utility." });
    } catch (err) {
        res.send({errmsg: "Failed to delete utility", success: false });
    } finally {
        if (conn) conn.release();
    }
}


const getAllRoomFilters = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const roomTypesResult = await conn.query("SELECT DISTINCT room_type FROM room");
        const floorsResult = await conn.query("SELECT DISTINCT floor_number FROM room");
        const capacitiesResult = await conn.query("SELECT DISTINCT room_capacity FROM room");

        // Extract just the values into arrays
        const roomTypes = roomTypesResult.map(row => row.room_type);
        const floors = floorsResult.map(row => row.floor_number);
        const capacities = capacitiesResult.map(row => row.room_capacity);
        
        res.send({ roomTypes, floors, capacities });
    } catch (err) {
        res.send({errmsg: "Failed to get all room filters", success: false });
    } finally {
        if (conn) conn.release();
    }
}

// get the room name
// input: "room_id"
const getRoomName = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_id } = req.body;

        // Check if the room exists
        const result = 'SELECT room_name FROM room WHERE room_id = ?';
        const rows = await conn.query(result, room_id);

        
        if (!rows || rows.length === 0) {
            res.status(404).send({ message: "Room not found." });
            return;
        }

        // Send the room name
        res.send({ roomName: rows[0].room_name });
    } catch (err) {
        res.status(500).send({ error: 'Database query error' });
    } finally {
        if (conn) conn.release();
    }
};

const processUtilities = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_id, utilities, room_capacity, fee, room_type, floor_number, additional_fee_per_hour } = req.body

        // Update room details
        const updateRoomQuery = `UPDATE room SET room_capacity = ?, fee = ?, room_type = ?, floor_number = ?, additional_fee_per_hour = ? WHERE room_id = ?`;
        const updateRoomValues = [room_capacity, fee, room_type, floor_number, additional_fee_per_hour, room_id];
        await conn.query(updateRoomQuery, updateRoomValues);

        // Get existing utilities from the database
        const existingUtilitiesQuery = `SELECT * FROM utility WHERE room_id = ?`;
        const existingUtilities = await conn.query(existingUtilitiesQuery, [room_id]);

        for (let i = 0; i < utilities.length; i++) {
            const { item_name, item_qty, fee } = utilities[i];

            // Check if the utility exists in the database
            const existingUtility = existingUtilities.find(utility => utility.item_name === item_name);

            if (existingUtility) {
                // Update the utility if it exists
                const updateQuery = `UPDATE utility SET item_qty = ?, fee = ? WHERE room_id = ? AND item_name = ?`;
                const updateValues = [item_qty, fee, room_id, item_name];
                await conn.query(updateQuery, updateValues);
            } else {
                // Add the utility if it does not exist
                const insertQuery = `INSERT INTO utility(room_id, item_name, item_qty, fee) VALUES(?,?,?,?)`;
                const insertValues = [room_id, item_name, item_qty, fee];
                await conn.query(insertQuery, insertValues);
            }
        }

        // Delete utilities that exist in the database but not in the request
        for (let i = 0; i < existingUtilities.length; i++) {
            const { item_name } = existingUtilities[i];

            if (!utilities.find(utility => utility.item_name === item_name)) {
                const deleteQuery = `DELETE FROM utility WHERE room_id = ? AND item_name = ?`;
                const deleteValues = [room_id, item_name];
                await conn.query(deleteQuery, deleteValues);
            }
        }

        res.send({ message: "Successfully processed utilities and updated room details." });
    } catch (err) {
        res.send({errmsg: "Failed to process utilities and update room details", success: false });
    } finally {
        if (conn) conn.release();
    }
}

const addNewRoom = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_name, room_capacity, fee, room_type, floor_number, additional_fee_per_hour, utilities } = req.body

        // Check if the room already exists in the database
        const existingRoomQuery = `SELECT * FROM room WHERE room_name = ?`;
        const existingRoom = await conn.query(existingRoomQuery, [room_name]);

        if (existingRoom.length > 0) {
            // If the room exists, send an error response
            res.send({errmsg: "Room already exists", success: false });
            return;
        } else {
            // Insert the new room into the room table
            const insertRoomQuery = `INSERT INTO room(room_name, room_capacity, fee, room_type, floor_number, additional_fee_per_hour) VALUES(?,?,?,?,?,?)`;
            const insertRoomValues = [room_name, room_capacity, fee, room_type, floor_number, additional_fee_per_hour];
            await conn.query(insertRoomQuery, insertRoomValues);

            // Get the ID of the inserted room
            const result = await conn.query('SELECT LAST_INSERT_ID() as room_id');
            const room_id = result[0].room_id;
            // console.log('Room ID:', room_id);

            for (let i = 0; i < utilities.length; i++) {
                const { item_name, item_qty, fee } = utilities[i];
            
                // Check if the utility already exists in the room
                const existingUtilityQuery = `SELECT * FROM utility WHERE room_id = ? AND item_name = ?`;
                const existingUtility = await conn.query(existingUtilityQuery, [room_id, item_name]);
            
                if (existingUtility.length > 0) {
                    // If the utility exists, skip to the next utility
                    continue;
                } else {
                    // Add the utility if it does not exist
                    const insertQuery = `INSERT INTO utility(room_id, item_name, item_qty, fee) VALUES(?,?,?,?)`;
                    const insertValues = [room_id, item_name, item_qty, fee];
                    await conn.query(insertQuery, insertValues);
                }
            }
        }

        res.send({ message: "Successfully added room and processed utilities."});

    } catch (err) {
        res.send({errmsg: "Failed to add room and process utilities", success: false });
    } finally {
        if (conn) conn.release();
    }
}




export { searchHandler, searchRoomByCapacity, searchRoomByType, searchRoomByName, getRoomInfo, getAllRooms , getAllRoomsAndUtilities, searchRoomById, insertRoom, setRoomClassSchedule, setEditedRoom, addUtility, deleteUtility, getRoomName, getAllRoomFilters, processUtilities, addNewRoom }

