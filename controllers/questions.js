const Question = require('../models/questions')

module.exports = {
  index,
  new: newQuestion,
  create,
  show
}

function index(req, res){
  Question.find({}).then((questions) =>{
    res.render('questions/index', { 
      title: 'The Knowledge Filter',
      questions,
      user: req.user
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
  //add user id
  Question.create(req.body).then((question) =>{
    console.log(question)
    res.redirect('/questions')
  })
}

function show(req, res){
  Question.findById(req.params.id).then((question)=>{
    res.render('questions/show', {
      title: question.subject,
      user: req.user,
      question
    })
  })
}