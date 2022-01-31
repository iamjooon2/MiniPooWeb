const express = require('express');
const passport = require('passport')
const helper = require('api/helper')
const AuthHandler = require('domains/auths/handler')
const { parseISO } = require('date-fns')

module.exports = (serviceDB) => {
	const authHandler = new AuthHandler(serviceDB)

	const router = express.Router();
	router.post('/login-jin', async (req, res) => {
		try {
			const { body: { username, password } } = req
			const sessionData = await authHandler.login({ username, password })
			res.cookie('session_token', sessionData.token, {
				expires: sessionData.expiry_at, // 해당 쿠키가 만료되는 날을 표시함
				httpOnly: true, // 브라우저에서 제어 못하도록, 쿠키는 특별한 헤더임, 브라우저하고 서버하고 같이 특별한 작업이 있음
				// cookie의 작동은 http 프로토콜의 규약임
			})
			res.sendStatus(204)
		} catch(e) {
			helper.sendErrorResponse(res, e, 503, "로그인 과정에 에러가 발생했습니다")
		}
	})

	router.post('/logout-jin', async (req, res) => {
		try {
			const { session_token } = req.cookies
			await authHandler.logout(session_token)
			res.clearCookie("session_token")
			res.sendStatus(204)
		} catch(e) {
			helper.sendErrorResponse(res, e, 503, "로그아웃에서 에러가 발생했습니다")
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
