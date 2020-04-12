var express = require('express');
var router = express.Router();
var db = require('../pgp.js');
var path = require('path')
var AWS = require('aws-sdk')
const fs = require('fs')
var multer = require('multer');
var timestamp = new Date().getTime();
let extname = ''
var storage = multer.diskStorage({
	destination: './public/currentimage/',
	filename: function(req, file, cb) {
		extname =  path.extname(file.originalname)
		cb(null, 'currentimage' + extname);
	}
});
var uploadN = multer({storage: storage}).single('image_uploads');

const BUCKET = 'picopy'
const REGION = 'us-east-2'
const ACCESS_KEY = 'AKIAIIUPXDZ5YGLNWUFA'
const SECRET_KEY = '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'

AWS.config.update({
	  accessKeyId: ACCESS_KEY,
	  secretAccessKey: SECRET_KEY,
	  region: REGION
	});

	var s3 = new AWS.S3();

router.post('/single', function(req, res, err) {
uploadN(req, res, (err) =>{
	if(err){
		res.render('index', {msg: err});
	}
	else{
		console.log(req.file);
		const localImage = String(req.file.path);
		console.log(localImage);
		const imageRemoteName = String(timestamp + extname);
		console.log(imageRemoteName);
	s3.putObject({
	  Bucket: BUCKET,
	  Body: fs.readFileSync(localImage),
	  Key: imageRemoteName
	})
	  
	res.render('index', {title: 'Picopy', user: req.session.user});
	}
	});

  });
  



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



