const passport = require('passport');
const Strategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../../config/db');

module.exports = () => {
  passport.use(new Strategy({ //첫번째 : req.body에 대한 설정
    usernameField : 'name',
    passwordField : 'password',
  }, (name, password, done) => { //로그인 전략
    const findUserQuery = 'SELECT * FROM USER WHERE NAME=?';
    db.connection.query(findUserQuery , [name], function (err, result) {
      if (err) console.log('mysql 에러');
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
  }))
}