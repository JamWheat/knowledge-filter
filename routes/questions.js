const express = require('express');
const router = express.Router();
const questionsCtrl = require('../controllers/questions');

router.get('/', questionsCtrl.index)
router.get('/new', isLoggedIn, questionsCtrl.new)
router.post('/', isLoggedIn, questionsCtrl.create)
router.get('/admin', isLoggedIn, isAdmin, questionsCtrl.adminIndex)
router.put('/:id/pub', isLoggedIn, isAdmin, questionsCtrl.pub)
// check to see if question is public?
router.get('/:id', questionsCtrl.show)
router.get('/:id/edit', isLoggedIn, isAdmin, questionsCtrl.edit)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next();
  res.redirect('/')
}

module.exports = router;