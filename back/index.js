const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const bcrypt = require('bcrypt');
const { connection } = require('./config/db');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.post('/api/user/register', (req, res) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const encryptedPassowrd = bcrypt.hashSync(password, 10);

  //bodyParser 필수
  var sql= 'INSERT INTO user (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)';

  db.connection.query( sql, [email, name, encryptedPassowrd],
    function (err, rows, coulmns){
      if (err){
        console.log(err);
        res.status(500);
        return res.json({ success: false, err });
      } else {
        console.log('가입성공');
        res.status(200);
        return res.status(200).json({ success: true });
      }
    })
});


app.post('/api/user/login', function(req, res){     

  const name = req.body.name;
  const password = req.body.password;                     
  var sql = 'SELECT * FROM user WHERE name = ?';
                                                           
  db.connection.query(sql, name, 
    function (err, rows, columns) {
      if (err) {
        console.log(err);
        res.json({ loginSuccess: false, err });
      } else {
        if (rows[0]!=undefined) { //해당하는 name이 있다면
          if (bcrypt.compareSync(password, rows[0].PASSWORD)) { //DB의 password와 비교하여
            res.status(200).json({ loginSuccess: true }); //같으면 loginSuccess : true
          } else {
            res.json({ loginSuccess: false }); //다르면 loginSuccess : false
          }
        } else { //해당하는 name이 없다면
          res.json({ loginSuccess: false }); // loginSuccess: false
        }
      } return res; // 함수 결과값
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