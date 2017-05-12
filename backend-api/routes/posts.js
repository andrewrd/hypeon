var express = require('express');
var router = express.Router();

//Database connections
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/hypeon-api';

/* Gets username, message and image from mongodb database */
router.get('/', function(req, res, next) {

  //Query database for image, database gathers image from s3
  	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to get most recent post");

	  if(err) { return console.dir(err); }
		db.collection('posts').find({}).sort({$natural:-1}).limit(1).toArray(function(err, docs){
		    res.json(docs[0]);
		});	   
	});
  //watch for changes, if change occurs, trigger callback.
});

module.exports = router;
