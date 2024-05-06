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
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
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
            console.log('hello')

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

            //create a session
            // const data = await conn.query("SELECT * FROM user WHERE email = ?", [email]);
            // const new_session = await createSession(data.email, req.get("user-agent")||"")

            //add a function here cookies and detecting if new user if successful
            // Save user data in session
            req.session.user = userData;
            console.log(req.session.user)

            // // create an access token and sign using jwt
            // const accessToken = signJwt(
            //     { ...user, session: session._id },
            //     { expiresIn: process.env.ACCESS_TOKEN_TTL } // 60 minutes
            // );
            // // create a refresh token and sign using jwt
            // const refreshToken = signJwt(
            //     { ...user, session: session._id },
            //     { expiresIn: process.env.REFRESH_TOKEN_TTL } // 1 year
            // );
            
            // //add to cookie
            // res.cookie("accessToken", accessToken, accessTokenCookieOptions);

            // res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

            // then make the client redirect to the home page xd
            res.redirect(process.env.AUTH_SUCCESS_REDIRECT || 'http://localhost:3000/homepage')
        }
        
    }
    catch(err){
        let errmsg = `Error with Google Sign in: ${err.message}`
        console.log(errmsg)
        // res.send(errmsg)
        res.redirect(process.env.AUTH_FAILURE_REDIRECT || `http://localhost:3000/login-fail?error=${errmsg}`)
        // res.redirect(process.env.AUTH_SUCESS_FAILURE)
    } finally {
        if (conn) conn.end();
    }
    
}

const getProfileData = async (req, res) => {
    
    res.send({ success: true, msg: "Session data set" });
}

const refreshAcessToken = async (req, res) => {

} 

const setSession = async (req, res) => {
    req.session.testData = "Testing session data";
    res.send({ success: true, msg: "Session data set" });
}

const getSession = async (req, res) => {
    res.send({ success: true, msg: "Session data retrieved", data: req.session.testData });
}

const logout = async (req, res) => {
    req.session = null;
    res.send({ success: true, msg: "Logged out successfully" });
}

//handles the checking of login
const checkIfLoggedIn = async (req, res) => {
    if (req.session.user) {
      res.send({ isLoggedIn: true });
    } else {
      res.send({ isLoggedIn: false });
    }
}

const  setUserInfoFirstLogin = async (req, res) => {
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

export {generateURL, callbackHandler, checkIfLoggedIn, setSession, getSession, logout, setUserInfoFirstLogin}




