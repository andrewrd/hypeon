var express = require('express');
var router = express.Router();
var env = require('../env.js');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
//Database connections
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
// Connection URL 
var url = 'mongodb://localhost:27017/hypeon-api';

router.get('/', function(req, res, next) {
	//Respond with post sent, refresh app
	res.json({ 
		message: 'This is the post page',
	});
});

/* Adds post to mongodb database */
router.post('/', function(req, res, next) {
  const message = req.query['message'];
  const username = req.query['username'];
  const image = req.query['image'];
  	MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  console.log("Connected correctly to create post");
		  
		  if(err) { return console.dir(err); }
				 db.collection('posts').insertOne({
				  	firstName: username,
				  	lastName: username,
				  	message: message,
				  	image: image,

					function(err, result) {
				    assert.equal(err, null);
				    console.log("Inserted a document into the database");
				    callback();
				    }
				});
	});
});

router.get('/', function(req, res, next) {
		// add username, message + image link to database, use req.name 

	// Use connect method to connect to the Server 
	// use the res variables to post through
	res.json({ 
		message: 'This is the create post page',
	});
});

module.exports = router;
