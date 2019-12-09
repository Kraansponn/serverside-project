var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database/database.db');

app.get('/comments', function (request, response) {
    console.log('get request recieved from at /comments');
    db.all('SELECT * FROM customer', function (err, rows) {
        if (err) {
            console.log('error' + err);
        } else {
            console.log(rows);
        }
    })
});