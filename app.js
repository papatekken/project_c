'use strict';

// application dependencies
var express = require('express');
var app = express();
var dotenv = require('dotenv');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser'); 
var logger = require('morgan');
var passport = require('passport');


//application component
var sessionSetup = require('./lib/middleware/sessionSetup');
var ioServer 	= require('./lib/middleware/ioServer')(app);
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userInViews = require('./lib/middleware/userInViews');

//unused component which reserved for future usage
//var secured = require('./lib/middleware/secured');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Middlewares

app.use(sessionSetup);
app.use(passport.initialize());
app.use(passport.session());
app.use(userInViews());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', authRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
