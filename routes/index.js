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
  res.render('login', {page:'login', mymessage:'', menuId:'login'});
});

router.post('/login', function (req, res, next) {
  var username = req.body.username; // gets username passed in from form
  var password = req.body.password; // gets password passed in from form
  let sql = `SELECT * 
           FROM customer 
           WHERE username = ? AND password = ?`;

  db.get(sql, [username, password], (err, row) => { //sql query formed and executed
    if (err) {
      return console.error(err.message);
    }
    if (row != null) {
      res.render('index', {page: 'index', menuId: 'index'});
    } else {
      res.render('login', {page: 'login', mymessage:'Incorrect Username or Password', menuId: 'login'});
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