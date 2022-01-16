const express = require('express'); //노드 모듈 가져오기
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const axios = require("axios");

const mysql = require('mysql2');
const db = require('./config/db');

app.get('/', (req, res) => { //루트디렉토리에 오면
  res.send('Home directory is now open!'); //hello world 출력
})

//DB connection test
app.get("/users", (req, res) => {
  db.connection.query( `SELECT * FROM user`, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Server Error');
      }
      res.send(results);
  });
});



app.post('/register', (req, res) => {
  
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  var sql= 'INSERT INTO user (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)';
  
  db.connection.query( sql, [email, name, password], (err, results, field) => {
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
}


//app.get -> 가져오다
//app.post -> 생성하기
//app.put -> 전체수정
//app.delete -> 제거
//app.patch -> 부분 수정

//RESTfulapi 제대로 지키기 힘듬, 애매하면 post, 팀끼리 합의해서 함
//swagger로 API 문서화 잘 함

app.get('/', (req, res) => { //루트디렉토리에 오면
  res.send('Home directory is now open!'); //hello world 출력
})

app.get('/api', (req, res) => { 
  res.send('API Routing is now complete');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})