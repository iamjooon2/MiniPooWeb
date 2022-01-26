const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log("serializeUser ", user)
  done(null, user.ID);
});

passport.deserializeUser(function(id, done) {
    console.log("deserializeUser id ", id)
    const userinfo;
    var sql = 'SELECT * FROM USER WHERE ID=?';
    db.connection.query(sql , [id], function (err, result) {
      if(err) console.log('mysql 에러');     
     
      console.log("deserializeUser mysql result : " , result);
      const json = JSON.stringify(result[0]);
      userinfo = JSON.parse(json);
      done(null, userinfo);
    })    
});

router.get('/login', function(req, res, next) {
  var userId = "";
  if(req.cookies['loginId'] !== undefined){
    console.log(req.cookies['loginId']);
    userId = req.cookies['rememberId'];
  }
  res.render('login', {userId: userId});
});


passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pwd'
  },
  function(username, password, done) {
    var sql = 'SELECT * FROM USER WHERE ID=? AND PWD=?';
    mysql.query(sql , [username, password], function (err, result) {
      if(err){
        console.log('mysql error')
      }  
      // 입력받은 ID와 비밀번호에 일치하는 회원정보가 없는 경우   
      if (result.length === 0) {
        console.log("결과 없음");
        return done(null, false, { message: 'Incorrect' });
      } else {
        console.log(result);
        const json = JSON.stringify(result[0]);
        const userinfo = JSON.parse(json);
        console.log("userinfo " + userinfo);
        return done(null, userinfo);  // result값으로 받아진 회원정보를 return해줌
      }
    })
  }
));

router.get('/home', function (req, res, next) {
  res.render('home', {"user_id" : req.user.ID});
});

router.post('/loginAf',
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

module.exports = router;