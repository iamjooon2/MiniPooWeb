const express = require('express');
const app = express();
const port = 5000;
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave : false,
  secret : process.env.COOKIE_SECRET  // cookie에 보내주는 랜덤한 문자열의 기반
}));
app.use(passport.initialize());
app.use(passport.session({}));

const router = require('./routes/user');
app.use('/api/user', router);

app.get('/api/hello', (req, res) => {
  res.send('Accepting data from the server is completely success!');
})

app.listen(port, () => {
  console.log(`Example app is now listening to http://localhost:${port}`)
})