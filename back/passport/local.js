const passport = require('passport');
const Strategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../config/db');

module.exports = () => {
  passport.use(new Strategy({ //첫번째 : req.body에 대한 설정
    usernameField : 'name',
    passwordField : 'password',
  }, (name, password, done) => { //로그인 전략
      try {
        //에러나는 부분 : user가 불러와지지 않음
        const user = findUserByName(name);
        console.log(user);
        if (!user) {
          done(null, false, { reason : '사용자가 존재하지 않음' });
        }
        const comparePasswordTrue = bcrypt.compareSync(password, user.password);
        if (comparePasswordTrue) {
          return done(null, user);
        }
        return done(null, false, { reason : '비밀번호가 틀림' });
      } catch (error) {
        console.log(error);
        return done(error);
      }
  }));
}

const findUserByName = (name) => {
	const findUserQuery = "SELECT * FROM USER WHERE NAME = ?";
	const result = db.connection.query(findUserQuery, [name]);
  console.log(name);
	return result[0];
};