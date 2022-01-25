const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const db = require('./config/db');
// const passport = require('passport');
// const passportConfig = require('./passport/index');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());

const router = require('./routes/user');

app.use('/api/user', router);

// var MySQLStore = require('express-mysql-session')(session);
// var LocalStrategy = require('passport-local').Strategy;

// app.use(session({
//   secret: '1234DSFs@adf1234!@#$asd',
//   resave: false,
//   saveUninitialized: true,
// 	store: new MySQLStore({
//     	host: '127.0.0.1',
//     	user: 'root',
//     	password :'cert0188*',
//     	database : 'minipooweb'
//     })
// }));


// passportConfig(passport);

//db 연결 확인용
app.get("/checkuser", (req, res) => {
  db.connection.query( `SELECT * FROM user`, (err, results) => {
      if (err) {
        res.status(500);
      } else {
        res.send(results);
      }
  });
});

app.get('/api/hello', (req, res) => {
  res.send('Accepting data from the server is completely success!');
})

app.listen(port, () => {
  console.log(`Example app is now listening to http://localhost:${port}`)
})