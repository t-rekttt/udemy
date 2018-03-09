require('dotenv').config()
const express = require('express')
const app = express()
const apiRouter = require(__dirname + '/modules/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.dburi)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

app.use('/api', apiRouter)

app.get('/', (req, res) => res.send('It works'))

app.listen(process.env.port, process.env.ip, function (req, res) {
  var host = this.address().address
  var port = this.address().port
  console.log(`Listening on ${host}:${port}`)
})