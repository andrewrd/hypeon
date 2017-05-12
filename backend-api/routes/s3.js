const express = require('express');
var env = require('../env.js');
var router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
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

router.get('/', function(req, res, next) {
  //Respond with post sent, refresh app
  res.json({ 
    message: 'This is the post page',
  });
});
router.post('/',function(req, res, next) {
  //Respond with post sent, refresh app
  res.json(req.file)
});

module.exports = router;
