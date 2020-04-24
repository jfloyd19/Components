var express = require('express');
var router = express.Router();
var db = require('../pgp.js');
var path = require('path')
var AWS = require('aws-sdk')
const fs = require('fs')
var multer = require('multer');
let extname = ''
const url = require('url');
const BUCKET = 'picopyimg'
const REGION = 'us-east-2'

const ACCESS_KEY = ''
const SECRET_KEY = ''





router.get('/single', function(req, res, err) {
	const s3 = new AWS.S3({
	  accessKeyId: ACCESS_KEY,
	  secretAccessKey: SECRET_KEY,
	  region: REGION
	});
	var u;
	const imageRemoteName = String(new Date().getTime() + ".png");
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: BUCKET,
    Key: imageRemoteName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
			res.end();
    }


		var objURL = `https://${BUCKET}.s3.amazonaws.com/${imageRemoteName}`
    const returnData = {
      signedRequest: data,
      url: objURL
    };

    res.write(JSON.stringify(returnData));
    res.end();
  });


});

module.exports = router;
