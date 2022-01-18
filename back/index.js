const express = require('express'); //노드 모듈 가져오기
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* */
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//DB connection test -> success!


//app.get -> 가져오다
//app.post -> 생성하기
//app.put -> 전체수정
//app.delete -> 제거
//app.patch -> 부분 수정

//RESTfulapi 제대로 지키기 힘듬, 애매하면 post, 팀끼리 합의해서 함
//swagger로 API 문서화 잘 함

app.get('/api/hello', (req, res) => {
  res.send('Mainpage response accept success!')
})

app.listen(port, () => {
  console.log(`Example app is now listening at http://localhost:${port}`)
})