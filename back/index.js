const express = require('express'); //노드 모듈 가져오기
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const axios = require("axios");

const mysql = require('mysql2');
const db = require('./config/db');

app.get("/users", (req, res) => {
  db.connection.query( `SELECT * FROM user`, (err, results)=>{
      if (err)
        console.log(err);
      res.send(results);
  });
});


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

app.post('/register', (req, res) => {
  //회원가입시 필요한 정보들을 front에서 가지고 오면
  //그 정보들을 db에 넣어준다
  const user = new user(req.body)

  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err })
    } else {
      return res.status(200).json({ success: true })
    }
  })
})

app.post('/api/user/login', (req, res) => {

  user.findOne({ email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message : "등록되지 않은 이메일입니다"
      })
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ 
          loginSuccess : false, 
          message: '비밀번호가 일치하지 않습니다'
        })
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})