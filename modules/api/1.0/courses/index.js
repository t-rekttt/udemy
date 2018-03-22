const Router = require('express').Router()
const courseController = require(__dirname + '/courseController')

Router.get('/getFreeCourses', (req, res, next) => {
	let amount = parseInt(req.query.amount) || 1
	let offset = parseInt(req.query.offset) || 0

	courseController.getFreeCourses(amount, offset)
		.then(docs => res.json({data: docs}))
		.catch(err => next(err))
})

Router.get('/searchFreeCourses', (req, res, next) => {
	if (!req.query.keyword) return res.json([])

	let amount = parseInt(req.query.amount) || 1
	let keyword = req.query.keyword.toLowerCase()
	let offset = parseInt(req.query.offset) || 0

	courseController.searchFreeCourses(keyword, amount, offset)
		.then(docs => res.json({data: docs}))
		.catch(err => next(err))
})

Router.get('/getCourseById', (req, res, next) => {
	let id = parseInt(req.query.id)

	if (!req.query.id) return res.json([])

	courseController.getCourseById(id)
		.then(doc => res.json({data: doc}))
		.catch(err => next(err))
})

module.exports = Router