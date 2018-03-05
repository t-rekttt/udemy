const r2 = require('r2')
const Course = require('../models/Courses.js')
const timeout = ms => new Promise(res => setTimeout(res, ms))

getCourseInfo = (id) => {
	return r2(`https://www.udemy.com/api-2.0/courses/${id}?fields[course]=@default,buyable_object_type,num_published_lectures,content_info,rating,num_reviews,discount,image_75x75,estimated_content_length,last_update_date,num_subscribers,created,is_wishlisted,badges,is_recently_published`).json
}

run = async () => {
	for (let i=0; i<2000000; i++) {
		try {
			let res = await getCourseInfo(i)
			let status = 'Failed'
			if (!res.detail) {
				Course.insertMany([res], (err, data) => {
					if (err) console.log(err.message)
				})
				status = 'Success'
			} else {
				if (res.detail.indexOf('throttled')!==-1) {
					let time = parseInt(/[0-9]+/.exec(res.detail))
					console.log('Sleeping '+time)
					await timeout(time*1000)
				}
			}
			console.log(i+': '+status)
		}
		catch (e) {
			console.log(e)
		}
	}
}

module.exports = { run }