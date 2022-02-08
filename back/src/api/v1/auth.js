const express = require('express');
const helper = require('api/helper')
const AuthHandler = require('domains/auths/handler')

module.exports = (serviceDB) => {
	const authHandler = new AuthHandler(serviceDB)

	const router = express.Router();
	
	router.post('/login', async (req, res) => {
		try {
			const username = req.body.username;
			const password = req.body.password;   
			console.log(username, password)
			const sessionData = await authHandler.login({ username, password })
			res.cookie('session_token', sessionData.token, {
				expires: sessionData.expiry_at, // 해당 쿠키가 만료되는 날을 표시함
				httpOnly: true, // 브라우저에서 제어 못하도록, 쿠키는 특별한 헤더임, 브라우저하고 서버하고 같이 특별한 작업이 있음
				// cookie의 작동은 http 프로토콜의 규약임
			})
			res.status(200).json({ loginSuccess: true })
		} catch(e) {
			helper.sendErrorResponse(res, e, 503, "로그인 과정에 에러가 발생했습니다")
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
			res.sendStatus(204)
			// res.redirect('/') // 이건 나중에 수정해서 보세용/
			//json은 redirect 안먹음
			//redirect()기능 알아둘 것
		} catch (e) {
			helper.sendErrorResponse(res, e, 503, "등록중 에러 발생")
		}
	})

	router.get('/', (req, res) => {
		res.send('hello from the server')
	})

	return router
}
