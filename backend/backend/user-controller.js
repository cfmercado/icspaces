import pool from './db.js';

const getAllUsers = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        await conn.beginTransaction();

        // create a new query
        var query = "SELECT * FROM user";

        // execute the query and set the result to a new variable
        var result = await conn.query(query);
        await conn.commit();
        // return the results
        res.send(result);
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to get all users", success: false });
    } finally {
        if (conn) return conn.release();
    }
}

const getAllStudents = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        await conn.beginTransaction();

        // create a new query
        var query = "SELECT user.email, fname, lname, usertype, profilePicUrl, student_number, org, course, college FROM user INNER JOIN student";

        // execute the query and set the result to a new variable
        var rows = await conn.query(query);
        await conn.commit();
        // return the results
        res.send(rows);
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to get all students", success: false });
    } finally {
        if (conn) return conn.release();
    }
}

const getAllFaculty = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        await conn.beginTransaction();
        // create a new query
        var query = "SELECT user.email, fname, lname, usertype, profilePicUrl, college, department FROM user INNER JOIN faculty";

        // execute the query and set the result to a new variable
        var rows = await conn.query(query);
        await conn.commit();
        // return the results
        res.send(rows);
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to get all faculty users", success: false });
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
        await conn.beginTransaction();

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
        await conn.commit();
        // return the results
        res.send({ message: 'User type updated, student data deleted, user added to faculty, and isFirstTimeLogin set to true.' });
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to change faculty type", success: false });
    } finally {
        if (conn) return conn.release();
    }
}

const updateStudentDetails = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        const { email, student_number, org, course, college, department } = req.body;
        await conn.beginTransaction();
        // create a new query to update the student details
        var queryUpdateStudent = "UPDATE student SET student_number = ?, org = ?, course = ?, college = ?, department = ? WHERE email = ?";
        const values = [student_number, org, course, college,  department, email];
        await conn.query(queryUpdateStudent, values);
        await conn.commit();
        // return the results
        res.send({message: 'Student details successfully updated.'});
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to update student details", success: false });
    } finally {
        if (conn) return conn.release();
    }
}

const updateFacultyDetails = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        const { email, college, department } = req.body;
        await conn.beginTransaction();
        // create a new query to update the faculty member details
        var queryUpdateFaculty = "UPDATE faculty_member SET college = ?, department = ? WHERE email = ?";
        await conn.query(queryUpdateFaculty, [college, department, email]);
        await conn.commit();
        // return the results
        res.send({ message: 'Faculty member details updated successfully.' });
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to change faculty details", success: false });
    } finally {
        if (conn) return conn.release();
    }
}

const getUserfromReservation = async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        const { reservation_id } = req.body;
        await conn.beginTransaction();
        var query = "SELECT u.fname, u.lname FROM user u INNER JOIN reservation r WHERE r.reservation_id = ? AND u.email = r.user_id ";
        await conn.query(query, reservation_id);
        await conn.commit();
        // return the results
        res.send({ message: 'Faculty member details updated successfully.' });
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to get user from reservation", success: false });
    } finally {
        if (conn) return conn.release();
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
        await conn.beginTransaction();
        var query = "SELECT CONCAT(fname, ' ', lname) as name, usertype, profilePicUrl FROM user WHERE email = ?";
        const rows = await conn.query(query, email);
        await conn.commit();
        // return the results
        res.send(rows[0]);
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to get user information", success: false });
    } finally {
        if (conn) return conn.release();
    }
}

// get the details of the student
// input: "email"
const getStudentDetails = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { email } = req.body;
        await conn.beginTransaction();
        var query = `
            SELECT 
                user.email, 
                CONCAT(user.fname, ' ', user.lname) as name, 
                user.usertype, 
                user.profilePicUrl, 
                student.student_number, 
                student.org, 
                student.course, 
                student.college, 
                student.department 
            FROM 
                user 
            JOIN 
                student ON user.email = student.email 
            WHERE 
                user.email = ?`;
        const rows = await conn.query(query, email);
        await conn.commit();
        // return the results
        res.send(rows[0]);
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to get user information", success: false });
    } finally {
        if (conn) return conn.release();
    }
}

// get the details of the faculty members
// input: "email"
const getFacultyDetails = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { email } = req.body;
        await conn.beginTransaction();
        var query = `
            SELECT 
                user.email, 
                CONCAT(user.fname, ' ', user.lname) as name, 
                user.usertype, 
                user.profilePicUrl, 
                faculty_member.college, 
                faculty_member.department 
            FROM 
                user 
            JOIN 
                faculty_member ON user.email = faculty_member.email 
            WHERE 
                user.email = ?`; 
        const rows = await conn.query(query, email);
        await conn.commit();
        // return the results
        res.send(rows[0]);
    } catch (err) {
        await conn.rollback();
        res.send({errmsg: "Failed to get user information", success: false });
    } finally {
        if (conn) return conn.release();
    }
}

// update user type to admin: 2
// input: "email"
const setFacultyToAdmin = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { email } = req.body;
        await conn.beginTransaction();
        var query = "UPDATE user SET usertype = 2 WHERE email = ?;";
        await conn.query(query, email);
        await conn.commit();
        // return the results
        res.send("Successfully edited user type to admin");
    } catch (err) {
        res.send({errmsg: "Failed to set faculty to admin", success: false });
    } finally {
        if (conn) return conn.release();
    }
}


// get the email of the user
// input: "fname", "lname"
const getEmail = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { fname, lname } = req.body;
        await conn.beginTransaction();
        // Check if the user exists
        const query = 'SELECT email FROM user WHERE fname = ? AND lname = ?';
        const rows = await conn.query(query, [fname, lname]);

        if (!rows || rows.length === 0) {
            res.status(404).send({ message: "User not found." });
            return;
        }
        await conn.commit();
        // Send the email
        res.send({ email: rows[0].email });
    } catch (err) {
        await conn.rollback();
        res.status(500).send({ error: 'Database query error' });
    } finally {
        if (conn) conn.release();
    }
};


export { getAllStudents, getAllUsers, changeUserType, updateStudentDetails, updateFacultyDetails, getAllFaculty, getUserfromReservation, getUserInformation, getEmail, getStudentDetails, getFacultyDetails, setFacultyToAdmin }