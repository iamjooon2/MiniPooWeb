const express = require('express');
const helper = require('api/helper')
const jwt = require('jsonwebtoken')

const AuthHandler = require('domains/auths/handler')

const dotenv = require('dotenv');
dotenv.config();

module.exports = (serviceDB) => {
	const authHandler = new AuthHandler(serviceDB)

	const router = express.Router();

	router.post('/login', async (req, res) => {
		try {
			const {username, password} = req.body
			const sessionData = await authHandler.login({ username, password })
			jwt.sign(user.id, 'secretToken')
			return res.json({
				loginSuccess: true ,
				message: "login Success"
			}) //json의 loginSuccess:true 통해 프론트단에서 redirect해준다
		} catch(e) {
			helper.sendErrorResponse(res, e, 503, "로그인 과정에 에러가 발생했습니다")
			return ({ loginSuccess: false })
		}
	})

	router.post('/logout', async (req, res) => {
		try {
			const { session_token } = req.cookies
			await authHandler.logout(session_token)
			req.session.destroy()
			console.log(req.user)
			res.clearCookie("session_token",  {path: '/'})
			res.sendStatus(204)
		} catch(e) {
			helper.sendErrorResponse(res, e, 503, "로그아웃에서 에러가 발생했습니다")
		}
	})

	router.post('/register', async (req, res) => {
		try {
			const {username, password} = req.body
			await authHandler.register({ username, password })
			return res.json({ success: true })
		} catch (e) {
			return res.json({ success: false, e })
		}
	})

	return router
}
