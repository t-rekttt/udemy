const Router = require('express').Router()
const courseController = require(__dirname + '/courseController')

Router.get('/getFreeCourses', (req, res) => {
	let amount = parseInt(req.query.amount) || 0
	courseController.getFreeCourses(amount)
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

Router.get('/searchFreeCourses', (req, res) => {
	if (!req.query.keyword) return res.json([]);

	let amount = parseInt(req.query.amount) || 0
	let keyword = req.query.keyword.toLowerCase();

	courseController.searchFreeCourses(keyword, amount)
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

module.exports = Router