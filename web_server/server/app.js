var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var user = require('./routes/user');
var search = require('./routes/search');
var welcomepage = require('./routes/welcomepage');
var login = require('./routes/login');
var signup = require('./routes/signup');

var app = express();

app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*
  Different routes
*/
app.use('/', index);
app.use('/',welcomepage);
app.use('/user', user);
app.use('/search', search);
app.use('/login', login);
app.use('/signup', signup);


// 404 not found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send('404 NOT FOUND');
});

module.exports = app;
