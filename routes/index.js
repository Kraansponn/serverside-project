var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {page:'login', menuId:'login'});
});

router.get('/register', function(req, res, next) {
  res.render('register', {page:'register', menuId:'register'});
});

module.exports = router;