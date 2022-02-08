const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const cookieParser = require('cookie-parser');
const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);
// const sessionStore = new MySQLStore(options);

const { pool:serviceDB } = require('adapters/servicedb')

const {
  SERVER_HOST,
  SERVER_PORT,
  COOKIE_SECRET,
} = process.env


const server = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  // app.use(session({
  //   saveUninitialized: false,
  //   resave : false,
  //   secret : process.env.COOKIE_SECRET  // cookie에 보내주는 랜덤한 문자열의 기반
  // }));
  
  app.use(cors());

  const v1Router = require('api/v1');
  app.use('/api/v1', v1Router(serviceDB));

  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Example app is now listening to http://${SERVER_HOST}:${SERVER_PORT}`)
  })
}


try {
  server(SERVER_PORT);
} catch (e) {
  console.error(e);
}


