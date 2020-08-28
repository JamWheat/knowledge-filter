const express = require('express');
const router = express.Router();
const filtersCtrl = require('../controllers/filters')

router.get('/', isLoggedIn, isAdmin, filtersCtrl.index)
router.post('/', isLoggedIn, isAdmin, filtersCtrl.create)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next();
  res.redirect('/')
}

module.exports = router;