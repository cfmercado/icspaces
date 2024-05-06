import pool from './db.js';

// gets all the reservations using user_id
// input: "user_id"
const getAllReservationsByUser = async (req, res) => {
    let conn;
    const { user_id } = req.body;
    try {
        conn = await pool.getConnection();
        
        console.log("User ID received:", user_id);
        const query = "SELECT * FROM reservation WHERE user_id = ?";
        const values = [user_id];
        const rows = await conn.query(query, values);
        console.log(rows)
        res.send(rows);
    } catch (err) {
        throw err;
    }
}

// get reservation information of a specific reservation using reservation_id
// input: "reservation_id"
const getReservation = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { reservation_id } = req.body;
        const query = "SELECT * FROM reservation WHERE reservation_id = ?";
        const values = [reservation_id];
        const rows = await conn.query(query, values);
        res.send(rows[0]);
    } catch (err) {
        throw err;
    }
}

const getAllReservationsbyRoom = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_id } = req.body;
        const query = "SELECT * FROM reservation WHERE room_id = ?";
        const values = [room_id];
        const rows = await conn.query(query, values);
        res.send(rows);
    } catch (err) {
        throw err;
    }
}

// get reservation information of a specific reservation using user_id and activity_name
// inputs: "user_id", "activity_name"
const getReservationByName =  async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { user_id, event_name } = req.body;
        const query = "SELECT * FROM reservation WHERE user_id = ? AND activity_name = ?";
        const values = [user_id, event_name];
        const rows = await conn.query(query, values);
        res.send(rows);
    } catch (err){
        throw err;
    }
}

// get reservations of user using user_id and status_code
// inputs: "user_id" and "status_code"
const getReservationByStatus = async (req, res)  => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { user_id, status_code } = req.body;
        const query = "SELECT * FROM reservation WHERE user_id = ? AND status_code = ?";
        const values = [user_id, status_code];
        const rows = await conn.query(query, values);
        res.send(rows);
    } catch (err){
        throw err;
    }
}

//get all reservations sorted by oldest first
const getReservationSortedOldest = async (req, res)  => {
    let conn;
    try {
        conn = await pool.getConnection()
        const { user_id } = req.body
        const query = "SELECT * FROM reservation WHERE user_id = ? ORDER BY date_created ASC"
        const values = [user_id]
        const rows = await conn.query(query, values)
        res.send(rows)
    } catch (err){
        throw err;
    }
}
//get all reservations sorted by lastest
const getReservationSortedNewest = async (req, res)  => {
    let conn;
    try {
        conn = await pool.getConnection()
        const { user_id } = req.body;
        const query = "SELECT * FROM reservation WHERE user_id = ? ORDER BY date_created DESC"
        const values = [user_id]
        const rows = await conn.query(query, values)
        res.send(rows)
    } catch (err){
        throw err;
    }
}
// insert reservation
const addReservation = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { activity_name, room_id, user_id, discount, additional_fee, total_amount_due, status_code } = req.body
        
        var query = `INSERT INTO reservation(
            activity_name, 
            room_id, 
            user_id, 
            discount,
            additional_fee,
            total_amount_due,
            status_code
        ) VALUES(?,?,?,?,?,?,?)`;
        const values = [activity_name, room_id, user_id, discount, additional_fee, total_amount_due, status_code];
        
        await conn.query(query, values);
        res.send({ message: "Successfully added reservation." });
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

// adds comment to reservation
// inputs: "reservation_id", "user_id", "comment_text"
const addComment = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { reservation_id, user_id, comment_text } = req.body
        var query = `INSERT INTO comment(reservation_id, user_id, comment_text) VALUES(?,?,?)`
        const values = [reservation_id, user_id, comment_text]
        await conn.query(query, values);
        res.send({ message: "Successfully added comment." });
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

// set the reservation status to approved, status_code = 1
// input: "reservation_id"
const setAsApproved = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { reservation_id } = req.body
        const query = "UPDATE reservation SET status_code = 1 WHERE reservation_id = ?";
        const values = [reservation_id];
        await conn.query(query, values);
        res.send({ message: "Successfully edited status to approved." });
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

// set the reservation status to paid, status_code = 2
// input: "reservation_id"
const setAsPaid = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { reservation_id } = req.body
        const query = "UPDATE reservation SET status_code = 2 WHERE reservation_id = ?";
        const values = [reservation_id];
        await conn.query(query, values);
        res.send({ message: "Successfully edited status to paid." });
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

// set the reservation status to disapproved/rejected, status_code = 3
// input: "reservation_id"
const setAsDisapproved = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { reservation_id } = req.body
        const query = "UPDATE reservation SET status_code = 3 WHERE reservation_id = ?";
        const values = [reservation_id];
        await conn.query(query, values);
        res.send({ message: "Successfully edited status to disapproved." });
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

// set the reservation status to cancelled, status_code = 4
// input: "reservation_id"
const setAsCancelled = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { reservation_id } = req.body
        const query = "UPDATE reservation SET status_code = 4 WHERE reservation_id = ?";
        const values = [reservation_id];
        await conn.query(query, values);
        res.send({ message: "Successfully edited status to cancelled." });
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}



// get reservations of a room per time range
// inputs: "room_id", "start_datetime", "end_datetime"
//                                                 y  m  d
// example inputs: "15", "2024-01-01 00:00:00", "2024-01-31 23:59:59"
const getReservationByRoom = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { room_id,start_datetime, end_datetime } = req.body
        
        // var query = `INSERT INTO room(room_name, room_capacity, fee, room_type) VALUES(?,?,?,?)`;
        var query = `SELECT *
                    FROM reservation
                    WHERE room_id = ?
                    AND start_datetime >= ?
                    AND end_datetime <= ?;`;
        const values = [room_id, start_datetime, end_datetime];
        
        var result = await conn.query(query, values);
        res.send(result);
    } catch (err) {
        throw err;
    }
}


    const getTotalRequest = async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            
            var query = `SELECT COUNT(*) AS count FROM reservation WHERE status_code IN (0, 1)`;
            
            var result = await conn.query(query);
    
            // Extract count from result and send as JSON
            res.json({ count: Number(result[0].count) });
        } catch (err) {
            throw err;
        }
    }
    
    const getPendingRequest = async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            
            var query = `SELECT COUNT(*) AS count FROM reservation WHERE status_code = 0`;
            
            var result = await conn.query(query);
    
            // Extract count from result and send as JSON
            res.json({ count: Number(result[0].count) });
        } catch (err) {
            throw err;
        }
    }
    
    const getTotalAccounts = async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            
            var query = `SELECT COUNT(*) AS count FROM user`;
            
            var result = await conn.query(query);
    
            // Extract count from result and send as JSON
            res.json({ count: Number(result[0].count) });
        } catch (err) {
            throw err;
        }
    }
    
    const getNewAccounts = async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            
            var query = `SELECT COUNT(*) AS count FROM user WHERE isFirstTimeLogin = TRUE`;
            
            var result = await conn.query(query);
    
            // Extract count from result and send as JSON
            res.json({ count: Number(result[0].count) });
        } catch (err) {
            throw err;
        }
    }
    
    const getPaid = async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            
            var query = `SELECT SUM((total_amount_due + additional_fee) * (1 - discount)) AS count
            FROM reservation WHERE status_code = 2`;
            
            var result = await conn.query(query);
    
            // Extract count from result and send as JSON
            res.json({ count: Number(result[0].count) });
        } catch (err) {
            throw err;
        }
    }
    
    const getPending = async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            
            var query = `SELECT SUM((total_amount_due + additional_fee) * (1 - discount)) AS count
            FROM reservation
            WHERE status_code = 1`;
            
            var result = await conn.query(query);
    
            // Extract count from result and send as JSON
            res.json({ count: Number(result[0].count) });
        } catch (err) {
            throw err;
        }
    }


const getTotalRoomReservations = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { email } = req.body
        const query = "SELECT COUNT(*) as totalReservations FROM reservation WHERE user_id = ?";
        const values = [email];
        const rows = await conn.query(query, values);
        //convert to number
        rows[0].totalReservations = Number(rows[0].totalReservations);
        res.send(rows[0]);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}


    const getAllReservations = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "SELECT reservation.*, room.room_name FROM reservation JOIN room ON reservation.room_id = room.room_id; ";
        const rows = await conn.query(query);
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}
    





export { 
    getTotalRequest, getPendingRequest, getTotalAccounts, getNewAccounts, 
    getPending, getPaid, getAllReservationsByUser, getReservation, getReservationByName, 
    getReservationByStatus, getReservationByRoom, addReservation, setAsApproved, setAsCancelled, 
    setAsDisapproved, setAsPaid, addComment, getAllReservations, getTotalRoomReservations,
    getReservationSortedOldest, getReservationSortedNewest, getAllReservationsbyRoom
}


