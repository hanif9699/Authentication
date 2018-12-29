var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var morgan = require('morgan');
var routes = require('./routes/user');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hanif', {
    useNewUrlParser: true
});



app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/users', routes);








var port = process.env.PORT || 3000;
app.listen(3000);
console.log('The server is running on ${port}');
