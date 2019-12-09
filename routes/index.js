var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

// connects to database

let db = new sqlite3.Database('database/database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {page:'login', menuId:'login'});
});

router.post('/login', function (req, res, next) {
  var username = req.body.Username;
  var password = req.body.password;
  let sql = `SELECT * 
           FROM customer 
           WHERE username = ? AND password = ?`;

  db.get(sql, [username, password], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (row != null) {
      res.render('index', {page: 'index', menuId: 'index'});
    } else {
      res.render('register', {page: 'index', menuId: 'index'});
    }
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {page:'register', menuId:'register'});
});

router.get('/basket', function(req, res, next) {
  res.render('basket', {page:'basket', menuId:'basket'});
});

router.get('/pizzabuilder', function(req, res, next) {
  res.render('pizzabuilder', {page:'pizzabuilder', menuId:'pizzabuilder'});
});

module.exports = router;