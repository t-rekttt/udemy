const { Course } = require(__dirname + '/../../../../models/')

getFreeCourses = (amount, offset) => {
  return Course.aggregate([
    {$match: {is_paid: false, rating: {$gt: 0}}},
    {$sort: {num_reviews: -1, rating: -1}},
    {$project: {__v: 0, _id: 0}},
    {$group: {_id: null, totalCount: {$sum: 1}, results: {$push: '$$ROOT'}}},
    {$project: {results: {$slice: ['$results', offset, amount]}, totalCount: 1}}
  ])
  .then(docs => {
    if (!docs || !docs.length) return {results: [], totalCount: 0};
    else return docs[0]
  })
}

searchFreeCourses = (keyword, amount, offset) => {
  return Course.aggregate([
    {$match: {is_paid: false, rating: {$gt: 0}, published_title: new RegExp(keyword)}},
    {$sort: {num_reviews: -1, rating: -1}},
    {$project: {__v: 0, _id: 0}},
    {$group: {_id: null, totalCount: {$sum: 1}, results: {$push: '$$ROOT'}}},
    {$project: {results: {$slice: ['$results', offset, amount]}, totalCount: 1}}
  ])
  .then(docs => {
    if (!docs || !docs.length) return {results: [], totalCount: 0};
    else return docs[0]
  })
}

getCourseById = (id) => {
  return Course.aggregate([
    {$match: {is_paid: false, rating: {$gt: 0}, id}}
  ])
  .then(docs => {
    if (!docs || !docs.length) return {results: [], totalCount: 0};
    else return docs[0]
  })
}

module.exports = { getFreeCourses, searchFreeCourses, getCourseById }