const router = require("../passport/local");
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const passport = require('passport')

router.post('/login', (req ,res) => {
	//local 전략에서의 done의 세 parameter가 콜백으로 들어온다
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			console.log(err);
			return 
		}
		if (info) { //client error
			console.log(info);
			return res.status(401).send(info);
		}
		return req.login(user, async (loginErr) => {
			if (loginErr) {
				console.error(loginErr);
			}
			return res.json(user);
		});
	})(req, res)
})

module.exports = router;