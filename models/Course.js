const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	_class: {
		type: 'String'
	},
	id: {
		type: 'Number',
		unique: 1
	},
	title: {
		type: 'String'
	},
	url: {
		type: 'String'
	},
	is_paid: {
		type: 'Boolean'
	},
	price: {
		type: 'String'
	},
	visible_instructors: {
		type: [
			'Mixed'
		]
	},
	image_125_H: {
		type: 'String'
	},
	image_240x135: {
		type: 'String'
	},
	is_practice_test_course: {
		type: 'Boolean'
	},
	image_480x270: {
		type: 'String'
	},
	published_title: {
		type: 'String'
	},
	num_subscribers: {
		type: 'Number'
	},
	discount: {
		type: 'Mixed'
	},
	rating: {
		type: 'Number'
	},
	num_reviews: {
		type: 'Number'
	},
	is_wishlisted: {
		type: 'Boolean'
	},
	num_published_lectures: {
		type: 'Number'
	},
	image_75x75: {
		type: 'String'
	},
	created: {
		type: 'Date'
	},
	estimated_content_length: {
		type: 'Number'
	},
	content_info: {
		type: 'String'
	},
	buyable_object_type: {
		type: 'String'
	},
	badges: {
		type: 'Array'
	},
	is_recently_published: {
		type: 'Boolean'
	},
	last_update_date: {
		type: 'Mixed'
	},
	description: {
		type: 'String'
	}
})

module.exports = mongoose.model('Course', postSchema)