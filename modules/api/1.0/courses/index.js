const Router = require('express').Router()
const courseController = require(__dirname + '/courseController')

Router.get('/getFreeCourses', (req, res) => {
	let amount = parseInt(req.query.amount) || 0
	courseController.getFreeCourses(amount)
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

module.exports = Router