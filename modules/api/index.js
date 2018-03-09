const Router = require('express').Router()
const versionRouter = require(__dirname + '/1.0')

Router.use('/1.0', versionRouter)

module.exports = Router