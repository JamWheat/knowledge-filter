const Question = require('../models/question')
const User = require('../models/user')

module.exports = {
  index,
  new: newQuestion,
  create,
  show,
  adminIndex
}

function index(req, res){
  Question.find({}).then((questions) =>{
    res.render('questions/index', { 
      title: 'The Knowledge Filter',
      questions,
      user: req.user ? req.user : null
    });
  })
}

function newQuestion(req, res){
  res.render('questions/new', {
    title: 'Submit a Question',
    user: req.user
  })
}

function create(req, res){
  req.body.asker = req.user._id
  Question.create(req.body).then((question) =>{
    console.log(question)
    res.redirect('/questions')
  })
}

function show(req, res){
  Question.findById(req.params.id).then((question)=>{
    User.findById(question.asker).then((asker) =>{
      res.render('questions/show', {
        title: question.subject,
        user: req.user ? req.user : null,
        question,
        asker
      })
    })
  })
}

function adminIndex(req, res){
  Question.find({}).then((questions) =>{
    res.render('questions/admin', { 
      title: 'Admin View',
      questions,
      user: req.user
    });
  })

}