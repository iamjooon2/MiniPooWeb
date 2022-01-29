const router = require("../passport/local");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');
const passport = require('passport')
,LocalStrategy = require('passport-local').Strategy;

const userInfoInsert = async (email, name, password) => {
	const userInsertQuery = "INSERT INTO USER(email, name, password) values(?, ?, ?)";
	await db.connection.query(userInsertQuery, [email, name, password]);
};

router.post("/register", async(req, res) => {

	const email = req.body.email;
  const name = req.body.name;
  const encryptedPassowrd = bcrypt.hashSync(req.body.password, 10);
	try {
		const result = await userInfoInsert(email, name, encryptedPassowrd);
	} catch (err) {
		console.log(err);
	}
})

const userInfoFilteredByName = async (name) => {
	const userFilterQuery = "SELECT * FROM USER WHERE NAME = ?";
	const result = await db.connection.query(userFilterQuery, [name]);
	return result[0];
};

passport.use(
	new LocalStrategy(
			async (name, password, done) => {
					const result = await userInfoFilteredByName(name);
				
					if (result.length > 0) {
							const user = result[0];
							if (user.password === password) {
									return done(null, user);
							} else {
									return done(null, false, {message: "틀린 비밀번호입니다"});
							}
					} else {
							return done(null, false, {message: "존재하지 않는 유저입니다"});
					}
			}
	)
);


module.exports = router;