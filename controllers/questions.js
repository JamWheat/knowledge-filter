const Question = require('../models/question')
const User = require('../models/user')
const Filter = require('../models/filter')

module.exports = {
  index,
  new: newQuestion,
  create,
  show,
  adminIndex,
  edit,
  pub,
  delete: deleteOne,
  like,
  unlike
}

function index(req, res){
  Question.find({})
  .sort({_id: -1})
    .then((questions) =>{
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
  Question.findById(req.params.id)
    .populate("answers.filter")
    .then((question)=>{
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
  Question.find({})
    .sort({_id: -1})
    .then((questions) =>{
    res.render('questions/admin', { 
      title: 'Admin View',
      questions,
      user: req.user
    });
  })
}

function edit(req, res){
  Question.findById(req.params.id)
    .populate("answers.filter")
    .then((question) =>{
    User.findById(question.asker).then((asker) =>{
      Filter.find({})
        .sort('name')
        .then((filters)=>{
        res.render('questions/edit', {
          title: `Edit: ${question.subject}`,
          user: req.user,
          question,
          asker,
          filters
        })
      })
    })
  })
}

function pub(req, res){
  Question.findById(req.params.id).then((question)=>{
    question.isPublic ? question.isPublic = false : question.isPublic = true
    question.save().then(() =>{
      res.redirect(`/questions/${question._id}/edit`)
    })
  })
}

function deleteOne(req, res){
  Question.findByIdAndDelete(req.params.id).then(()=>{
    res.redirect('/questions/admin')
  })
}

function like(req, res){
  Question.findById(req.params.id).then((question)=>{
    question.likedBy.push(req.user._id)
    question.save().then(()=>{
      res.redirect(`/questions/${req.params.id}`)
    })
  })
}

function unlike(req, res){
  Question.findById(req.params.id).then((question)=>{
    let idx = question.likedBy.indexOf(req.user._id)
    question.likedBy.splice(idx, 1)
    question.save().then(()=>{
      res.redirect(`/questions/${req.params.id}`)
    })
  })
}