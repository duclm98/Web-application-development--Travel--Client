var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var placeRouter = require('./routes/place');
var hotelRouter = require('./routes/hotel');
var restaurantRouter = require('./routes/restaurant');

const User = require('./models/users');

passport.use(new LocalStrategy({usernameField: 'email'},
  async function (username, password, done) {
    try {
      const user = await User.get(username);
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      const isPasswordValid = await User.validPassword(username, password);
      if (!isPasswordValid) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      return done(null, user);
    } catch (ex) {
      return done(ex);
    }
  }));

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
  const user = await User.get(email);
  done(undefined, user);
});

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "duc regera"}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/place', placeRouter);
app.use('/hotel', hotelRouter);
app.use('/restaurant', restaurantRouter);

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
