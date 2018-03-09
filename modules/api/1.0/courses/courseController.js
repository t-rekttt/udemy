const { Course } = require(__dirname + '/../../../../models/')

getFreeCourses = (amount) => {
	return Course.aggregate([
		{$match: {is_paid: false}},
		{$project: {__v: 0, _id: 0}},
		{$limit: amount}
	])
}

module.exports = { getFreeCourses }