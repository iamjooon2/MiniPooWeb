const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
,LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const router = require('./routes/user');

app.use('/api/user', router);

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