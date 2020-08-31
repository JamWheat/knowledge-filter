const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/:id', isLoggedIn, usersCtrl.show)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
