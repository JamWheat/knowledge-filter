const express = require('express');
const router = express.Router();
const questionsCtrl = require('../controllers/questions')

router.get('/', questionsCtrl.index)
router.get('/new', isLoggedIn, questionsCtrl.new)
router.post('/', isLoggedIn, questionsCtrl.create)
router.get('/:id', questionsCtrl.show)

// router.get('/', function(req, res, next) {
//   res.render('questions/index', { 
//     title: 'The Knowledge Filter' ,
//     user: req.user
//   });
// });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;