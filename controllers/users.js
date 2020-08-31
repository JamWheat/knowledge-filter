const User = require('../models/user')

module.exports = {
  show,
  index,
  admin
}

function show(req, res){
  res.render('users/show', {
    title: req.user.name + "'s Profile",
    user: req.user
  })
}

function index(req, res){
  User.find({}).then((users) =>{
    res.render('users/index', {
      title: 'User List',
      user: req.user,
      users
    })
  })
}

function admin(req, res){
  User.findById(req.params.id).then((user) =>{
    user.isAdmin ? user.isAdmin = false : user.isAdmin = true
    user.save().then(() =>{
      res.redirect('/users')
    })
  })
}