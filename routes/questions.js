var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('questions/index', { 
    title: 'The Knowledge Filter' ,
    user: req.user
  });
});

module.exports = router;