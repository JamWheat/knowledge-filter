const express = require('express');
const router = express.Router();
const answersCtrl = require('../controllers/answers')

router.post('/questions/:id/answers', isLoggedIn, isAdmin, answersCtrl.create)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next();
  res.redirect('/')
}

module.exports = router;