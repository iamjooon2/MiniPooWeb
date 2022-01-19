const express = require('express'); //노드 모듈 가져오기
const router = express.Router();
const db = require('../config/db');

router.post('/api/user/register', (req, res) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  var sql= 'INSERT INTO user (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)';

  db.connection.query( sql, [email, name, password], 
    function (err, rows, coulmns){
    if (err){
      console.log(err);
      res.status(500);
      return res.status(403).json({success: false, err});
    } else {
      console.log('가입성공');
      res.status(200);
      return res.status(200).json({success: true});
    } 
  })
});


//db 연결 확인용
router.get("/checkuser", (req, res) => {
  db.connection.query( `SELECT * FROM user`, (err, results) => {
      if (err) {
        res.status(500);
      } else {
        res.send(results);
      }
  });
});

