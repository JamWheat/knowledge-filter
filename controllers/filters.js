const Filter = require('../models/filter')

module.exports = {
  index,
  create,
  show,
  edit
}

function index(req, res){
  let query = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {}
  Filter.find(query)
    .sort('name')
    .then((filters) =>{
    res.render('filters/index', {
      title: 'Filters',
      user: req.user,
      filters
    })
  })
}

function create(req, res){
  Filter.create(req.body).then(() =>{
    res.redirect('/filters')
  })
}

function show(req, res){
  Filter.findById(req.params.id).then((filter) =>{
    res.render('filters/show', {
      title: filter.name,
      user: req.user,
      filter
    })
  })
}

function edit(req, res){
  Filter.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((filter) =>{
    console.log(filter)
    res.redirect('/filters')
  })
}