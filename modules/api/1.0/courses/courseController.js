const { Course } = require(__dirname + '/../../../../models/')

getFreeCourses = (amount) => {
	return Course.aggregate([
		{$match: {is_paid: false, rating: {$gt: 0}}},
		{$sort: {num_reviews: -1, rating: -1}},
		{$project: {__v: 0, _id: 0}},
		{$limit: amount}
	])
}

searchFreeCourses = (keyword, amount) => {
	return Course.aggregate([
		{$match: {is_paid: false, rating: {$gt: 0}, published_title: new RegExp(keyword)}},
		{$sort: {num_reviews: -1, rating: -1}},
		{$project: {__v: 0, _id: 0}},
		{$limit: amount}
	])
}

module.exports = { getFreeCourses, searchFreeCourses }