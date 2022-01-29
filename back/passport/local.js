const passport = require('passport');
const Strategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../config/db');

module.exports = () => {
  passport.use(new Strategy({ //첫번째 : req.body에 대한 설정
    usernameField : 'name',
    passwordField : 'password',
  }, async (name, password, done) => { //로그인 전략
      try {
        const user = await findUserByName(name);
        if (!user) {
          done(null, false, { reason : '사용자가 존재하지 않음'});
        }
        const comparePasswordTrue = await bcrypt.compare(password, findUserByName(user.password));
        if (comparePasswordTrue) {
          return done(null, user);
        }
        return done(null, false, { reason : '비밀번호가 틀림'});
      } catch (error) {
        console.log(error);
        return done(error);
      }
  }));
}

const findUserByName = async (name) => {
	const findUserQuery = "SELECT * FROM USER WHERE NAME = ?";
	const result = await db.connection.query(findUserQuery, [name]);
	return result[0];
};