var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var loggedInUsername = "";
var basketList= [];
// connects to database

let db = new sqlite3.Database('database/database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {page: 'Home', mymessage: '', menuId: 'home'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {page: 'login', mymessage: '', menuId: 'login'});
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
            loggedInUsername = username;
            res.render('index', {page: 'index', mymessage: '', menuId: 'index'});
        } else {
            loggedInUsername = "";
            res.render('login', {page: 'login', mymessage: 'Incorrect Username or Password', menuId: 'login'});
        }
    });
});

router.get('/register', function (req, res, next) {
    res.render('register', {page: 'register', menuId: 'register'});
});

router.post('/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var personname = req.body.personname;
    var address = req.body.address;
    var phonenumber = parseInt(req.body.phonenumber);

    let sql = 'INSERT INTO customer (username,password,name,phone,address) VALUES (?,?,?,?,?);';

    db.run(sql, [username, password, personname, address, phonenumber], function (err) {
        if (err) {
            return console.error(err.message);
        }
        res.render('login', {page: 'login', mymessage: 'Account Registered Sucessfully', menuId: 'login'});
        console.log(`Rows inserted ${this.changes}`);
    });

});

router.get('/basket', function (req, res, next) {
    if (loggedInUsername !== "") {
        res.render('basket', {
            page: loggedInUsername + '\'s Basket',
            menuId: 'basket',
            pizza: []
        });
    } else {
        res.render('login', {page: 'login', mymessage: 'Please Login First', menuId: 'login'});
    }
});

router.post('/basket', function (req, res, next) {
    var crust = req.body.crust;
    var sauce = req.body.sauce;
    var cheese = req.body.cheese;
    var ingredient1 = req.body.ingredient1;
    var ingredient2 = req.body.ingredient2;
    var ingredient3 = req.body.ingredient3;
    var ingredient4 = req.body.ingredient4;
    var ingredient5 = req.body.ingredient5;


    res.render('basket', {
        page: loggedInUsername + '\'s Basket',
        menuId: 'basket',
        pizza: [crust, sauce, cheese, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5]
    });
});

router.get('/pizzabuilder', function (req, res, next) {
    if (loggedInUsername !== "") {
        res.render('pizzabuilder', {
            page: loggedInUsername + '\'s Pizza Builder',
            mymessage: 'Logged In',
            menuId: 'pizzabuilder'
        });
    } else {
        res.render('login', {page: 'login', mymessage: 'Please Login First', menuId: 'login'});
    }

});


router.get('/order-complete', function (req, res, next) {
    res.render('order-complete', {page: 'Confirm Order Details', menuId: 'Confirm Order Details'});
});
//
// router.post('/order-complete', function (req, res, next) {
//     var name = req.body.personname;
//     var deliverytype = req.body.deliverytype;
//     console.log(deliverytype);
//     res.render('order-status', {page: '', mymessage: 'Order Confirmed', menuId: 'order-status'});
// });


router.post('/order-status', function (req, res, next) {
    var name = req.body.personname;
    var deliverytype = req.body.deliverytype;
    console.log(deliverytype);
    res.render('order-status', {page: 'order-status',mymessage: 'Order Confirmed', menuId: 'order-status'});
});



module.exports = router;