const express = require('express');
const helper = require('api/helper')
const AuthHandler = require('domains/auths/handler')

module.exports = (serviceDB) => {
	const authHandler = new AuthHandler(serviceDB)

	const router = express.Router();

	router.get("/login", (req, res) => {
		if (req.session.user) {
		  res.send({
			loggedIn: true, 
			user: req.session.user 
		})
		} else {
		  res.send({ loggedIn: false })
		}
	  })

	router.post('/login', async (req, res) => {
		try {
			const {username, password} = req.body
			const sessionData = await authHandler.login({ username, password })
			res.cookie('session_token', sessionData.token, { // 이거 통해서 보낸다 
				expires: sessionData.expiry_at, // 해당 쿠키가 만료되는 날을 표시함
				httpOnly: true, // 브라우저에서 제어 못하도록, 쿠키는 특별한 헤더임, 브라우저하고 서버하고 같이 특별한 작업이 있음
				// cookie의 작동은 http 프로토콜의 규약임
			})
			return res.json({
				loginSuccess: true ,
				message: "login Success"
			})
		} catch(e) {
			helper.sendErrorResponse(res, e, 503, "로그인 과정에 에러가 발생했습니다")
			return ({ loginSuccess: false })
		}
	})

	router.post('/logout', async (req, res) => {
		try {
			const { session_token } = req.cookies
			await authHandler.logout(session_token)
			res.clearCookie("session_token")
			res.sendStatus(204)
		} catch(e) {
			helper.sendErrorResponse(res, e, 503, "로그아웃에서 에러가 발생했습니다")
		}
	})

	router.post('/register', async (req, res) => {
		try {
			const username = req.body.username
			const password = req.body.password
			await authHandler.register({ username, password })
			//json은 redirect 안먹음
			return res.json({ success: true })
		} catch (e) {
			helper.sendErrorResponse(res, e, 503, "등록중 에러 발생")
			return res.json({ success: false, err })
		}
	})

	return router
}
