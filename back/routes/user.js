const express = require('express');
const router = express.Router();
const db = require('./config/db');

//연결 확인용
router.get("/users", (req, res) => {
  db.connection.query( `SELECT * FROM user`, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Server Error');
      }
      res.send(results);
  });
});


router.post('/api/user/register', (req, res) => {

  console.log('회원가입 시작');
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  var sql= 'INSERT INTO user (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)';
  
  console.log('잘 들어왔나 확인', email, name, password, sql);

  db.connection.query( sql, [email, name, password], 
    (err, results, field) => {
    if (err){
      console.log(err);
      res.status(500).json({success: false, err});
    } else {
      res.status(200).json({
        success: true
      })
    }
    res.send(results);
  })
});