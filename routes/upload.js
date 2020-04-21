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

const ACCESS_KEY = 'AKIAYO7HRSCHMHYEVD4P'
const SECRET_KEY = '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'


	var s3 = new AWS.S3({
	  accessKeyId: ACCESS_KEY,
	  secretAccessKey: SECRET_KEY,
	  region: REGION
	});


router.post('/single', function(req, response, err) {
	var u;
	var image_data = req.body.image_data;
	var base64Data = image_data.replace(/^data:image\/png;base64,/, "");
	const localImage = path.resolve("out.png");
	fs.writeFileSync(localImage, base64Data, 'base64', function(err) {
		console.log(err);
	});
	const imageRemoteName = String(new Date().getTime() + ".png");
	s3.putObject({
		Bucket: BUCKET,
		Body: fs.readFileSync(localImage),
		Key: imageRemoteName
	  }).promise()
	  .then(response => {
		  u = (s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName }).split("?").shift());

		var query = `INSERT INTO photo VALUES (DEFAULT, '${req.session.user.user_id}',  '${u}', '${req.body.filter_s}', '${req.body.Private}');`;
		db.any(query)
			.then(function () {
				console.log("DB Updated successfully");
			})
			.catch(function (err) {
				console.log(err);
			}) 
	  })
	  .catch(err => {
		console.log('failed:', err)
	  })
});

module.exports = router;
