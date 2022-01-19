const express = require('express'); //노드 모듈 가져오기
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/db');

/* */
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

//연결 확인용
app.get("/users", (req, res) => {
  db.connection.query( `SELECT * FROM user`, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500);
      }
      res.send(results);
  });
});

app.post('/api/user/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  var sql= 'SELECT * FROM user WHERE email = ? AND password = ?';

  db.connection.query(sql, [email, password], 
    function(err, results) {
    if (err) {
      console.log(err);
    }
    else if (!results[0]) {
      return res.send('check your id');
    }
  })

});


app.post('/api/user/register', (req, res) => {

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

app.get('/api/hello', (req, res) => {
  res.send('Accepting the data from server is completely success!');
})

app.listen(port, () => {
  console.log(`Example app is now listening at http://localhost:${port}`)
})