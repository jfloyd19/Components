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


// s3.putObject({
// 	  Bucket: BUCKET,
// 	  Body: fs.readFileSync(writeFile),
// 	  Key: canvasRemoteName
// 	}, function(err, data){
// 	if(err){console.log('file upload failed')}else{
// 		console.log('file uploaded successfully.');}
// 	});

// 	url = 'https://picopyimg.s3.us-east-2.amazonaws.com/' + canvasRemoteName;
// 	url2 = 'https://picopyimg.s3.us-east-2.amazonaws.com/' + imageRemoteName;
// 	console.log(url);
// 	object = req.body.Private ? true : false;
// 	console.log(req.session.user.user_id);
// 	console.log(object);
// 	console.log(req.body.imgString);
// 	//insert photo data into table
// 	if(req.body.imgString != ""){
// 	var query = `INSERT INTO photo VALUES (DEFAULT, '${req.session.user.user_id}',  '${url}', '${req.body.imgString}', '${object}');`;
// 		db.any(query)
// 			.then(function () {
// 		console.log("DB Updated successfully");
// 			res.render('index', {title: 'Picopy', user: req.session.user});
// 			})
// 			.catch(function (err) {
// 				// display error message in case an error
// 	request.flash('error', err);
// 				console.log(err);
// 			}) 
// 	}else{
// 		var query = `INSERT INTO photo VALUES (DEFAULT, '${req.session.user.user_id}',  '${url2}', '${req.body.imgString}', '${object}');`;
// 		db.any(query)
// 			.then(function () {
// 		console.log("DB Updated successfully");
// 			res.render('index', {title: 'Picopy', user: req.session.user});
// 			})
// 			.catch(function (err) {
// 				// display error message in case an error
// 	request.flash('error', err);
// 				console.log(err);
// 			}) 
		
// 	}
// 	}
// 		});


  



module.exports = router;




/*var query = `INSERT INTO photo VALUES (DEFAULT, '${req.session.user.user_ids}', '${Key}', '${req.body.private}', '${req.body.imgString}');`;
	  db.any(query)
        .then(function () {
          res.render('index');
        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            console.log(err);
        })
*/



