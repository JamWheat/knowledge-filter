const express = require('express');
const router = express.Router();
const questionsCtrl = require('../controllers/questions');

router.get('/page/:page', questionsCtrl.index)
router.get('/new', isLoggedIn, questionsCtrl.new)
router.post('/', isLoggedIn, questionsCtrl.create)
router.get('/admin/:page', isLoggedIn, isAdmin, questionsCtrl.adminIndex)
router.get('/about', questionsCtrl.about)
router.put('/:id/pub', isLoggedIn, isAdmin, questionsCtrl.pub)
// check to see if question is still public?
router.get('/:id', questionsCtrl.show)
router.get('/:id/edit', isLoggedIn, isAdmin, questionsCtrl.edit)
router.delete('/:id', isLoggedIn, isAdmin, questionsCtrl.delete)
router.get('/:id/like', isLoggedIn, questionsCtrl.like)
router.get('/:id/favorite', isLoggedIn, questionsCtrl.favorite)
router.get('/:id/append', isLoggedIn, questionsCtrl.append)
router.put('/:id/userup', isLoggedIn, questionsCtrl.userUpdate)
router.delete('/:id/userdel', isLoggedIn, questionsCtrl.userDelete)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next();
  res.redirect('/')
}

module.exports = router;