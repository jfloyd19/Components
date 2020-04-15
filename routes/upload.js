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

const ACCESS_KEY = ''
const SECRET_KEY = ''


	var s3 = new AWS.S3({
	  accessKeyId: ACCESS_KEY,
	  secretAccessKey: SECRET_KEY,
	  region: REGION
	});

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
		const canvasRemoteName = String(timestamp+ "canvas" + extname);
		console.log("Key: " + imageRemoteName);
	s3.putObject({
	  Bucket: BUCKET,
	  Body: fs.readFileSync(localImage),
	  Key: imageRemoteName
	}, function(err, data){
	if(err){console.log('file upload failed')}
	console.log('file uploaded successfully. ${data.Location}');
	});

var writeFile = String("./public/currentimage/canvas" + extname);
var base64Data = req.body.image_canvas.replace(/^data:image\/png;base64,/, "");
fs.writeFileSync(writeFile, base64Data, 'base64', function(err){
	console.log(err);
});


s3.putObject({
	  Bucket: BUCKET,
	  Body: fs.readFileSync(writeFile),
	  Key: canvasRemoteName
	}, function(err, data){
	if(err){console.log('file upload failed')}
	console.log('file uploaded successfully. ${data.Location}');
	});
	  
	console.log(req.session.user.user_ids);
console.log(req.body.Private.checked);
console.log(req.body.imgString);
res.render('index', {title: 'Picopy', user: req.session.user});
var query = `INSERT INTO photo VALUES (DEFAULT, '${req.session.user.user_ids}', '${canvasRemoteName}', '${req.body.imgString}', '${req.body.Private.checked}');`;
	  db.any(query)
        .then(function () {
          
        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            console.log(err);
        }) 
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



