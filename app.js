var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var methodOverride = require('method-override')
const PORT = process.env.PORT || 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/root',express.static(path.join(__dirname + '/root')));
app.use('/modules',express.static(path.join(__dirname + '/node_modules')));


//render
app.get('/', (req, res) => {
  res.render('main');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log('ok: server'.toUpperCase());
});

module.exports = app;
