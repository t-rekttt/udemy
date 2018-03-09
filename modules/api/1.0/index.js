const Router = require('express').Router()
const coursesRouter = require(__dirname + '/courses')

Router.use('/', coursesRouter)

module.exports = Router