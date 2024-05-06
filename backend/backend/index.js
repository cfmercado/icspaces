import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
import session from 'express-session'
// import cookieSession from 'cookie-session';

import MySQLStoreInit from 'express-mysql-session';
const MySQLStore = MySQLStoreInit(session);

import setUpRoutes from "./routes.js";
//connect MariaDB
import pool from './db.js';

//session store
const options = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_ROOT_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	createDatabaseTable: true,
	// schema: {
	// 	tableName: 'custom_sessions_table_name',
	// 	columnNames: {
	// 		session_id: 'custom_session_id_column_name',
	// 		expires: 'custom_expires_column_name',
	// 		data: 'custom_data_column_name'
	// 	}
	// }
};

const sessionStore = new MySQLStore(options);

// initialize express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Allow CORS
app.use(cors({
    origin: ['http://localhost:3000'], //allowed URLs
    methods: ['GET', 'POST', 'OPTIONS'], //allowed HTTP methods
    credentials: true, //allow cookies
    // allowedHeaders: ['Access-Control-Allow-Origin','Access-Control-Allow-Methods','Origin','Accept','Content-Type','X-Requested-With','Cookie']
}));

//edited to use cookie-session
// app.use(cookieSession({
//     name: 'session',
//     keys: ['ICSpaces-auth-temporary'],
//     maxAge: 24 * 60 * 60 * 1000,
// }))

//express-session 
app.use(
    session({
        secret: process.env.PRIVATE_KEY,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
		cookie: {
			secure: false,
			// httpOnly: true,
			maxAge: Number(process.env.ACCESS_TOKEN_TTL)
		}
    })
)

// Setup routes
setUpRoutes(app);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});