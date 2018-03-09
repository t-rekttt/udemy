require('dotenv').config()
const mongoose = require('mongoose')
const crawler = require('./crawler.js')

mongoose.connect(process.env.dburi);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('DB connected');
	crawler.run()
});