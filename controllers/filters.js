const Filter = require('../models/filter')

module.exports = {
  index,
  create
}

function index(req, res){
  Filter.find({}).then((filters) =>{
    res.render('filters/index', {
      title: 'Filters',
      user: req.user,
      filters
    })
  })
}

function create(req, res){
  Filter.create(req.body).then((filter) =>{
    console.log(filter)
    res.redirect('/filters')
  })
}