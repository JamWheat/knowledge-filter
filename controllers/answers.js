const Question = require('../models/question')

module.exports = {
  create,
  update,
  delete: deleteOne
}

function create(req, res){
  req.body.author = req.user.name
  Question.findById(req.params.id).then((question)=>{
    question.answers.push(req.body)
    question.save().then(()=>{
      res.redirect(`/questions/${req.params.id}/edit`)
    })
  })
}

function update(req, res){
  req.body.author = req.user.name
  Question.findOne({'answers._id': req.params.id}).then((question) =>{
    question.answers.id(req.params.id).remove()
    question.answers.push(req.body)
    question.save().then(() =>{
      res.redirect(`/questions/${question._id}/edit`)
    })
  })

}

function deleteOne(req, res){
  Question.findOne({'answers._id': req.params.id}).then((question) =>{
    question.answers.id(req.params.id).remove()
    question.save().then(() =>{
      res.redirect(`/questions/${question._id}/edit`)
    })
  })
}