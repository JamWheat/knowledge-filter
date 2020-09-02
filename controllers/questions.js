const Question = require('../models/question')
const User = require('../models/user')
const Filter = require('../models/filter')
const { NotFound } = require('http-errors')

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
  favorite,
  append,
  userUpdate,
  userDelete,
  about
}

function index(req, res){
  const resPerPage = 15
  const page = parseInt(req.params.page)
  Question.countDocuments({isPublic: true}).then((totalQs)=>{
    Question.find({isPublic: true})
      .sort({_id: -1})
      .skip((resPerPage * page) - resPerPage)
      .limit(resPerPage)
      .then((questions) =>{
        res.render('questions/index', { 
        title: 'The Knowledge Filter',
        questions,
        user: req.user ? req.user : null,
        currentPage: page,
        pages: Math.ceil(totalQs / resPerPage)
      });
    })
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
    res.redirect('/questions/page/1')
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
  const resPerPage = 15
  const page = parseInt(req.params.page)
  Question.countDocuments({}).then((totalQs)=>{
    Question.find({})
      .sort({_id: -1})
      .skip((resPerPage * page) - resPerPage)
      .limit(resPerPage)
      .then((questions) =>{
      res.render('questions/admin', { 
        title: 'Admin View',
        questions,
        user: req.user,
        currentPage: page,
        pages: Math.ceil(totalQs / resPerPage)
      });
    })
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
    res.redirect(`/questions/admin/${req.body.page}`)
  })
}

function like(req, res){
  Question.findById(req.params.id).then((question)=>{
    if (!question.likedBy.includes(req.user._id)){
      question.likedBy.push(req.user._id)
    } else {
      let idx = question.likedBy.indexOf(req.user._id)
      question.likedBy.splice(idx, 1)
    }
    question.save().then(()=>{
      res.redirect(`/questions/${req.params.id}`)
    })
  })
}

function favorite(req, res){
  Question.findById(req.params.id).then((question)=>{
    if (!question.favoritedBy.includes(req.user._id)){
      question.favoritedBy.push(req.user._id)
    } else {
      let idx = question.favoritedBy.indexOf(req.user._id)
      question.favoritedBy.splice(idx, 1)
    }
    question.save().then(()=>{
      res.redirect(`/questions/${req.params.id}`)
    })
  })
}

function append(req, res){
  Question.findById(req.params.id).then((question)=>{
    res.render('questions/append', {
      title: `Edit: ${question.subject}`,
      user: req.user,
      question
    })
  })
}

function userUpdate(req, res){
  Question.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((question)=>{
    res.redirect(`/users/${req.user._id}`)
  })
}

function userDelete(req, res){
  Question.findByIdAndDelete(req.params.id).then(()=>{
    res.redirect(`/users/${req.user._id}`)
  })
}

function about(req, res){
  res.render('questions/about', {
    title: 'About the Knoledge Filter',
    user: req.user ? req.user : null
  })
}