var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Gets the routes
var posts = require('./routes/posts');
var uploadPhoto = require('./routes/uploadPhoto');
var index = require('./routes/index');
var s3 = require('./routes/s3');
var createpost = require('./routes/createPost');

var app = express();

//Aws stuff 
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Sets the route locations and calls them.
app.use('/getposts', posts);
app.use('/uploadphoto', uploadPhoto);
app.use('/', index);
app.use('/upload', s3);
app.use('/createpost', createpost);
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
	
//Database connections
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
// Connection URL 
var url = 'mongodb://localhost:27017/hypeon-api';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to database");
    db.close();
});

module.exports = app;

