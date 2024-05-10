import validator from 'validator';
import { OAuth2Client } from 'google-auth-library';
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import dotenv from "dotenv"
dotenv.config()
import pool from "./db.js"

import { signJwt, verifyJwt } from "./utils/jwt-utils.js"

const accessTokenCookieOptions = {
    maxAge: process.env.ACCESS_TOKEN_TTL, // 60 mins
    httpOnly: true,
    domain: process.env.DOMAIN,
    path: "/",
    sameSite: "lax",
    secure: false,
  };
  
  const refreshTokenCookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: process.env.REFRESH_TOKEN_TTL, // 1 year
  };

const generateURL = async (req,res,next) => {
    res.header('Access-Control-Allow-Origin', 'https://icspaces.onrender.com')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')

    const redirectUrl = process.env.GOOGLE_AUTH_REDIRECT

    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUrl
    )

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email', 'openid'],
        prompt: 'consent',
        hd: 'up.edu.ph'
    })  

    res.json({url:authorizeUrl})
}

const getUserDataFromGoogle = async (access_token) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
    const data = await response.json()
    console.log('data',data)
    return data
}

const callbackHandler = async (req,res,next) => {
    let conn;
    const code = req.query.code
    try {
        const redirectUrl = process.env.GOOGLE_AUTH_REDIRECT;
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        )
        const tokenResponse = await oAuth2Client.getToken(code)
        await oAuth2Client.setCredentials(tokenResponse.tokens)
        // console.log('Tokens acquired')
        const user = oAuth2Client.credentials;
        // console.log('credentials', user)
        const userData = await getUserDataFromGoogle(user.access_token)
        
        const firstName = userData.given_name; // Assuming Google returns first name as given_name
        const lastName = userData.family_name; // Assuming Google returns last name as family_name
        const email = userData.email;
        const profilepic = userData.picture;
        const isVerified = userData.email_verified
        
        //check if email is verified
        if (isVerified != true){
            let redirectMsg = "Email not verified"
            res.redirect(`${process.env.AUTH_FAILURE_REDIRECT}?error=${redirectMsg}`)
        }
        //check if email is form up.edu.ph
        if (!(validator.isEmail(email) && email.endsWith('@up.edu.ph')) || userData.hd !== 'up.edu.ph') {
            let redirectMsg = "Email is not a UPmail account"
            res.redirect(`${process.env.AUTH_FAILURE_REDIRECT}?error=${redirectMsg}`)
        }
        else{
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM user WHERE email = ?", [email]);
            

            //Upsert user
            // Scenario 1: FAIL - User doesn't exist
            if (rows.length === 0) {
                // Insert the email, first name, last name, and user type into the user table
                await conn.query("INSERT INTO user (email, fname, lname, usertype, profilePicUrl) VALUES (?, ?, ?, ?, ?)", [email, firstName, lastName, 0, profilepic]);

                // Insert the email into the student table
                await conn.query("INSERT INTO student (email) VALUES (?)", [email]);

            }else{ // UPDATE user 
                await conn.query("UPDATE user SET fname = ?, lname = ?, profilePicUrl = ? WHERE email =?", [firstName, lastName, profilepic, email]);
            }

            const new_rows = await conn.query("SELECT * FROM user WHERE email = ?", [email]);
            console.log(new_rows[0].usertype)
            //create a session
            //add a function here cookies and detecting if new user if successful
            // Save user data in session
            req.session.email = email;
            req.session.displayname = userData.name;
            req.session.fname = firstName;
            req.session.lname = lastName;
            req.session.profilepic = profilepic;
            req.session.usertype = rows[0].usertype ; // 0 for student, 1 for faculty, 2 for oic, 3 for director
            // req.session.access_token = user.access_token;
            // console.log(req.session.user)
            // console.log(req.session.id)
            const sessionData = await req.sessionStore.get(req.session.id)
            console.log(sessionData)
            
            // then make the client redirect to the home page xd
            res.redirect(process.env.AUTH_SUCCESS_REDIRECT || 'https://icspaces.onrender.com/homepage')
        }
        
    }
    catch(err){
        let errmsg = `Error with Google Sign in: ${err.message}`
        console.log(errmsg)
        // res.send(errmsg)
        res.redirect(process.env.AUTH_FAILURE_REDIRECT || `https://icspaces.onrender.com/login-fail?error=${errmsg}`)
        // res.redirect(process.env.AUTH_SUCESS_FAILURE)
    } finally {
        if (conn) conn.end();
    }
    
}

const getProfileData = async (req, res) => {
    console.log(req.session.email)
    if (req.session.email){
        res.send({ 
            success: true, 
            data: {
            email: req.session.email,
            displayname: req.session.displayname,
            firstName: req.session.fname,
            lastName: req.session.lname,
            profilepic: req.session.profilepic,
            usertype: req.session.usertype
            }
        });
    }else{
        res.send({ 
            success: false, 
            msg: "Not Authenticated."
        });
    }
} 

const logout = async (req, res) => {
    // req.session = null;
    const email = req.session.email
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err)
          res.status(500).send('Internal Server Error')
        } else {
          // Redirect the user to the login page or any other page
          console.log(`User ${email} has been logged out`)
        //   res.redirect(`${process.env.LOGOUT_REDIRECT}`);
          res.send({success:true});
        }
    })
}

//handles the checking of login
const checkIfLoggedIn = async (req, res) => {
    if (req.session.email) {
      res.send({ isLoggedIn: true });
    } else {
      res.send({ isLoggedIn: false });
    }
}

const setUserInfoFirstLogin = async (req, res) => {
    const { usertype } = req.body
    try {
        switch(usertype) {
            case 0:
                return await setStudentInfoFirstLogin(req, res);
            case 1:
                return await setFacultyInfoFirstLogin(req, res);
            case 2:
                return await setAdminInfoFirstLogin(req, res);
            case 3:
                return await setDirectorInfoFirstLogin(req, res);
        }
    } catch (err) {
        console.error("Error in setUserInfoOnFirstLogin:", err);
    }
}

const setStudentInfoFirstLogin = async (req, res) => {
    const { email, student_number, org, course, college } = req.body
    let conn;
    conn = await pool.getConnection();
    try{
        await conn.query("UPDATE student SET student_number = ?, org = ?, course = ?, college = ? WHERE email = ?", [student_number, org, course, college, email]);
        await conn.query("UPDATE user SET isFirstTimeLogin = ? WHERE  email = ?", [true, email]);
    } catch(err) {
        console.error("Error in setStudentInfoOnFirstLogin:", err);
    } finally {
        if (conn) conn.release();
    }
}

const setFacultyInfoFirstLogin = async (req, res) => {
    const { email, college, department } = req.body
    let conn;
    conn = await pool.getConnection();
    try{
        await conn.query("UPDATE student SET college = ?, department = ? WHERE email = ?", [college, department, email]);
        await conn.query("UPDATE user SET isFirstTimeLogin = ? WHERE email = ?", [true, email]);
    } catch(err) {
        console.error("Error in setStudentInfoOnFirstLogin:", err);
    } finally {
        if (conn) conn.release();
    }
}

const setAdminInfoFirstLogin = async (req, res) => {
    //not yet used
}

const setDirectorInfoFirstLogin = async (req, res) => {
    //not yet used

}

export {generateURL, callbackHandler, checkIfLoggedIn, getProfileData, logout, setUserInfoFirstLogin}




