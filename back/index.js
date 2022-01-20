const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.post('/api/user/register', (req, res) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  const encryptedPassowrd = bcrypt.hashSync(password, 10);

  var sql= 'INSERT INTO user (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)';

  db.connection.query( sql, [email, name, encryptedPassowrd],
    function (err, rows, coulmns){
      if (err){
        console.log(err);
        res.status(500);
        return res.status(403).json({ success: false, err });
      } else {
        console.log('가입성공');
        res.status(200);
        return res.status(200).json({ success: true });
      }
    })
});

app.post('/api/user/login', (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
  
    var sql= 'SELECT * FROM user WHERE name = ? AND password = ?';

    db.connection.query(sql, [name, password], 
      function(err, rows, columns) {
      if (err) {
        console.log(err);
      }
      else if (!results[0]) {
        return res.send('check your id');
      }
    })
  
  });

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