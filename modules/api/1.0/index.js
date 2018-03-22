const Router = require('express').Router()
const coursesRouter = require(__dirname + '/courses')
const userRouter = require(__dirname + '/user')

Router.use('/', coursesRouter)
Router.use('/', userRouter)

module.exports = Router