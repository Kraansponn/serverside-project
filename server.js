var express = require('express');
var app = express();

// var db = new sqlite3.Database('database/database.db');
// works when in index js

//
// app.get('/comments', function (request, response) {
//     console.log('get request recieved from at /comments');
//     db.all('SELECT * FROM customer', function (err, rows) {
//         if (err) {
//             console.log('error' + err);
//         } else {
//             console.log(rows);
//         }
//     })
// });



var sqlite3 = require('sqlite3');

let db = new sqlite3.Database('database/database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

});

// close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});
