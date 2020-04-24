var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');


var index = require('./routes/index');
var gallery = require('./routes/gallery');
var register = require('./routes/register');
var createAccount = require('./routes/createAccount');
var login = require('./routes/login');
var logout = require('./routes/logout');
var upload = require('./routes/upload');
var saveToDb = require('./routes/saveToDb')

var app = express();

//Cookie stuff
app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
　app.use(bodyParser.json({limit: '50mb'}));
　　app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/gallery', gallery);
app.use('/register', register);
app.use('/createaccount',createAccount);
app.use('/login', login);
app.use('/logout', logout);
app.get('/single',  upload);
app.post('/saveToDb', saveToDb);
app.use(express.static(__dirname + '/public'));

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
