const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users')

router.get('/', isLoggedIn, isAdmin, usersCtrl.index)
router.get('/:id', isLoggedIn, usersCtrl.show)
router.put('/:id/admin', isLoggedIn, isAdmin, usersCtrl.admin)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next();
  res.redirect('/')
}

module.exports = router;
