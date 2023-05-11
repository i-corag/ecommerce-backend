import * as dotenv from 'dotenv';
import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { testDB } from './src/database/db.config.js';
import routerAPI from './src/routes/index.js';

dotenv.config();

//CREATE SERVER
const app = express();

//CONECTION TO DB
testDB();

//MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

//EXPRESS SESSION CONFIG
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    key: 'userId', //the key is the name of the cookie is going to create
    secret: process.env.SESSION_SECRET,
    resave: true, //true?
    saveUninitialized: true, //true?
    cookie: {
      maxAge: 3600 * 24 * 60 * 60 * 7, //one week
    },
  })
);

//ROUTES
routerAPI(app);

//SERVER LISTEN
const PORT = process.env.PORT;
app.listen(PORT || 5955, () => {
  console.log('Listening on port: ', PORT);
});
