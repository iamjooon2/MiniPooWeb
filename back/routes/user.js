const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');

//=================================
//             User
//=================================

router.post('/register', (req, res) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const encryptedPassowrd = bcrypt.hashSync(password, 10);

  //bodyParser가 있어야 한다
  var sql= 'INSERT INTO user (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)';

  db.connection.query( sql, [email, name, encryptedPassowrd],
    function (err, rows, coulmns){
      if (err){
        console.log(err);
        res.json({ success: false, err });
      } else {
        console.log('가입성공');
        res.status(200).json({ success: true });
      }
    return res;
    })
});

router.post('/login', function(req, res){     

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
      } return res;
    })
});

router.get('/logout', function(req, res){
  req.logout();
  req.session.save(function(){
    res.redirect('/');
  });
});

// router.get("/auth", auth, (req, res) => {
//   res.status(200).json({
//       _id: req.user._id,
//       isAdmin: req.user.role === 0 ? false : true,
//       isAuth: true,
//       email: req.user.email,
//       name: req.user.name,
//       lastname: req.user.lastname,
//       role: req.user.role,
//       image: req.user.image,
//   });
// });

module.exports = router;