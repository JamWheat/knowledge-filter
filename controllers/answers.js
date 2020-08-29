const Question = require('../models/question')

module.exports = {
  create
}

function create(req, res){
  Question.findById(req.params.id).then((question)=>{
    question.answers.push(req.body)
    question.save().then(()=>{
      res.redirect(`/questions/${req.params.id}/edit`)
    })
  })
}