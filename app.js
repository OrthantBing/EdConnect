var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

var index = require('./routes/index');
var users = require('./routes/users');

const lead = require('./routes/lead');
const education = require('./routes/education');
const experience = require('./routes/experience');
const languagetest = require('./routes/languagetest');

var app = express();

// Connect to Database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database' + config.database);
});


mongoose.connection.on('error', (err) => {
  console.log('Database error: '  + err);
});

// Cross site scripting:

app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// Static path for accessing in production.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/lead', lead);
app.use('/education', education);
app.use('/experience', experience);
app.use('/languagetest', languagetest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
