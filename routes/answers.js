const express = require('express');
const router = express.Router();
const answersCtrl = require('../controllers/answers')

router.post('/questions/:id/answers', isLoggedIn, isAdmin, answersCtrl.create)
router.put('/answers/:id', isLoggedIn, isAdmin, answersCtrl.update)
router.delete('/answers/:id', isLoggedIn, isAdmin, answersCtrl.delete)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next();
  res.redirect('/')
}

module.exports = router;