const express = require('express');
const router = express.Router();
const questionsCtrl = require('../controllers/questions');

router.get('/', questionsCtrl.index)
router.get('/new', isLoggedIn, questionsCtrl.new)
router.post('/', isLoggedIn, questionsCtrl.create)
router.get('/admin', isLoggedIn, isAdmin, questionsCtrl.adminIndex)
// check to see if question is public?
router.get('/:id', questionsCtrl.show)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next();
  res.redirect('/')
}

module.exports = router;