const Router = require('express').Router()
const userController = require('./userController.js')

Router.post('/login', (req, res) => {
	if (!req.body || !req.body.email || !req.body.password) {
		return res.err('Missing credentials')
	}

	let email = req.body.email
	let password = req.body.password

	userController.login(email, password)
		.then(res.succ)
		.catch(res.err)
})

Router.post('/subscribe', (req, res) => {
	if (!req.body || !req.body.token || !req.body.course_id) {
		return res.err('Missing fields')
	}

	let token = req.body.token
	let course_id = req.body.course_id

	userController.subscribe(token, course_id)
		.then(res.succ)
		.catch(res.err)
})

module.exports = Router