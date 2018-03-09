const r2 = require('r2')
const { Course } = require(__dirname + '/../models')
const timeout = ms => new Promise(res => setTimeout(res, ms))
const async = require('async')
const HttpsProxyAgent = require('https-proxy-agent')

getCourseInfo = (id) => {
  let options = {}

  if (process.env.https_proxy) {
    options.agent = new HttpsProxyAgent(process.env.https_proxy)
  }

  return r2(`https://www.udemy.com/api-2.0/courses/${id}?fields[course]=@default,buyable_object_type,num_published_lectures,content_info,rating,num_reviews,discount,image_75x75,estimated_content_length,last_update_date,num_subscribers,created,is_wishlisted,badges,is_recently_published`, options).json
          .catch(err => {
            console.log('Get course info', err)
            return getCourseInfo(id)
          })
          .then(async res => {
            status = 'Failed'
            if (res.detail && res.detail.indexOf('throttled')!==-1) {
              let time = parseInt(/[0-9]+/.exec(res.detail))
              console.log('Sleeping '+time)
              await timeout(time*1000)
              return getCourseInfo(id)
            } else {
              if (!res.detail) {
                status = 'Success'
              }

              console.log(id+': '+status)
              return res
            }
          })
}

processCourseInfo = (res) => {
  if (!res.id)
    return new Promise(cb => cb())
  return Course.insertMany([res], (err, data) => {
    if (err) console.log(err.message)
  })
}

getLastId = () => {
  return Course.aggregate([
    {$sort: {'id': -1}},
    {$limit: 1},
    {$project: {id: 1}}
  ])
}

run = async () => {
  let start = process.env.start_course_id
  let end = process.env.end_course_id
  let last_id = 0
  try {
    last_id = await getLastId()
  }
  catch (e) {
    console.log('Get last id', e)
  }

  if (!last_id || !last_id.length)
    return;

  end -= last_id[0].id

  async.timesLimit(end-start+1, process.env.crawler_threads_amount, (i, next) => {
    getCourseInfo(i+last_id[0].id)
      .then(processCourseInfo)
      .then(next)
  })
}

module.exports = { run }