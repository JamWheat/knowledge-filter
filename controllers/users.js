const User = require('../models/user')
const Questions = require('../models/question')

module.exports = {
  show,
  index,
  admin,
  edit,
  update
}

function show(req, res){
  User.findById(req.params.id).then((thisUser) =>{
    Questions.find({favoritedBy: req.params.id}).then((questions)=>{
      res.render('users/show', {
        title: thisUser.alias + "'s Profile",
        user: req.user,
        questions,
        thisUser
      })
    })
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

function edit(req, res){
  res.render('users/edit', {
    title: 'Edit Profile',
    user: req.user
  })
}

function update(req, res){
  if(req.body.alias === ''){
    req.body.alias = req.user.name
  }
  if(req.body.altIcon === ''){
    req.body.altIcon = req.user.icon
  }
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((user) =>{
    res.redirect(`/users/${req.params.id}`)
  })
}