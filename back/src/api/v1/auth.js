const express = require('express');
const passport = require('passport')
const helper = require('api/helper')
const AuthHandler = require('domains/auth/handler')



module.exports = (serviceDB) => {
	const authHandler = new AuthHandler(serviceDB)
	// const sessionHandler = new SessionHandler(serviceDB)

	const router = express.Router();
	router.post('/login-jin', async (req, res) => {
		try {
			const userInfo = await authHandler.login({ username, password })
			if(!!userInfo) {

			}
		} catch(e) {
			helper.sendErrorResponse(res, e, 503, "로그인 과정에 에러가 발생했습니다")
		}
	})

	router.get('/', (req, res) => {
		res.send({ wow: 'hi' })
	})
	router.post('/login', (req ,res, next) => {
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
			return req.login(user, (loginErr) => {
				if (loginErr) {
					console.error(loginErr);
					return next(loginErr);
				}
				return res.status(200).json(user);
			});
		})(req, res, next);
	});

	router.post('logout', (req, res) => {
		req.logout();
		req.session().destroy();
		req.send('logout success!');
	})

	return router
}
