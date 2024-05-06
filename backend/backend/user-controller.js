import pool from './db.js';

const getAllUsers = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        var query = "SELECT * FROM user";

        // execute the query and set the result to a new variable
        var result = await conn.query(query);

        // return the results
        res.send(result);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
}

const getAllStudents = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        var query = "SELECT user.email, fname, lname, usertype, profilePicUrl, student_number, org, course, college FROM user INNER JOIN student";

        // execute the query and set the result to a new variable
        var rows = await conn.query(query);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
}

const getAllFaculty = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        var query = "SELECT user.email, fname, lname, usertype, profilePicUrl, college, department FROM user INNER JOIN faculty";

        // execute the query and set the result to a new variable
        var rows = await conn.query(query);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
}

const changeUserType = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        const { email, college, department } = req.body;

        // create a new query to update the user type
        var queryUpdate = "UPDATE user SET usertype = 1 WHERE email = ?";
        await conn.query(queryUpdate, [email]);

        // create a new query to delete the student data
        var queryDelete = "DELETE FROM student WHERE email = ?";
        await conn.query(queryDelete, [email]);

        // create a new query to insert the user into the faculty table
        var queryInsert = "INSERT INTO faculty_member (email, college, department) VALUES (?, ?, ?)";
        await conn.query(queryInsert, [email, college, department]);

        // create a new query to set isFirstTimeLogin to true
        var queryFirstLogin = "UPDATE user SET isFirstTimeLogin = true WHERE email = ?";
        await conn.query(queryFirstLogin, [email]);

        // return the results
        res.send({ message: 'User type updated, student data deleted, user added to faculty, and isFirstTimeLogin set to true.' });
    } catch (err) {
        throw err;
    } 
}

const updateStudentDetails = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        const { email, student_number, org, course, college, department } = req.body;

        // create a new query to update the student details
        var queryUpdateStudent = "UPDATE student SET student_number = ?, org = ?, course = ?, college = ?, department = ? WHERE email = ?";
        const values = [student_number, org, course, college,  department, email];
        await conn.query(queryUpdateStudent, values);
        
        // return the results
        res.send({message: 'Student details successfully updated.'});
    } catch (err) {
        throw err;
    } 
}

const updateFacultyDetails = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        const { email, college, department } = req.body;

        // create a new query to update the faculty member details
        var queryUpdateFaculty = "UPDATE faculty_member SET college = ?, department = ? WHERE email = ?";
        await conn.query(queryUpdateFaculty, [college, department, email]);

        // return the results
        res.send({ message: 'Faculty member details updated successfully.' });
    } catch (err) {
        throw err;
    } 
}

const getUserfromReservation = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        const { reservation_id } = req.body;

        var query = "SELECT u.fname, u.lname FROM user u INNER JOIN reservation r WHERE r.reservation_id = ? AND u.email = r.user_id ";
        await conn.query(query, reservation_id);

        // return the results
        res.send({ message: 'Faculty member details updated successfully.' });
    } catch (err) {
        throw err;
    } 
}

const searchUserbyName = async (req, res) => {

}

const searchUserById = async (req, res) => {

}

const searchUserByEmail = async (req, res) => {

}

const getUserInformation = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { email } = req.body;

        var query = "SELECT CONCAT(fname, ' ', lname) as name, usertype, profilePicUrl FROM user WHERE email = ?";
        const rows = await conn.query(query, email);

        // return the results
        res.send(rows[0]);
    } catch (err) {
        throw err;
    } 
}

// get the email of the user
// input: "fname", "lname"
const getEmail = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { fname, lname } = req.body;

        // Check if the user exists
        const query = 'SELECT email FROM user WHERE fname = ? AND lname = ?';
        const rows = await conn.query(query, [fname, lname]);

        if (!rows || rows.length === 0) {
            res.status(404).send({ message: "User not found." });
            return;
        }

        // Send the email
        res.send({ email: rows[0].email });
    } catch (err) {
        res.status(500).send({ error: 'Database query error' });
    } finally {
        if (conn) conn.release();
    }
};


export { getAllStudents, getAllUsers, changeUserType, updateStudentDetails, updateFacultyDetails, getAllFaculty, getUserfromReservation, getUserInformation, getEmail }