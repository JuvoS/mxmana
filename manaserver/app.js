var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');

var basicRouter = require('./routes/basic.router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'MANA',
  duration: 30 * 60 * 1000,
  resave: false,
	saveUninitialized: false
}));

app.use('/', basicRouter.index);
app.use('/users', basicRouter.users);
app.use('/api/user', basicRouter.user);
app.use('/json', basicRouter.json);
app.use('/orm', basicRouter.orm);
app.use('/install', basicRouter.install);
app.use('/api/menu', basicRouter.menu);
app.use('/pattern', basicRouter.pattern);
app.use('/product', basicRouter.product);
app.use('/solution', basicRouter.solution);
app.use('/upload', basicRouter.upload);
app.use('/airtab', basicRouter.airTab);
app.use('/download', basicRouter.downLoad);

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
  res.render('404');
});

module.exports = app;
