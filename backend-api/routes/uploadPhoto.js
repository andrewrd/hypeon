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
const s3 = new aws.S3({
  accessKeyId: 'AKIAIXDBEFTKIRUQKKTQ',
  secretAccessKey: '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',
  region: "us-east-1",
});

// Initialize multers3 with our s3 config and other options
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "hypeon",
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key(req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    }
  })
})

/* Adds post to mongodb database */
router.post('/', upload.single('photo'), function(req, res, next) {
  //Respond with post sent, refresh app
  res.json(req.file);
  console.log(req.file);
});

router.put('/', function(req, res, next) {
	res.json({ 
		message: 'This is the upload photo page',
	});
});

module.exports = router;
