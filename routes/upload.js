var express = require('express');
var router = express.Router();
var db = require('../pgp.js');
var path = require('path')
var AWS = require('aws-sdk')
const fs = require('fs')

const BUCKET = 'picopy'
const REGION = 'us-east-2'
const ACCESS_KEY = ''
const SECRET_KEY = ''

router.post('/', function(req, res, err) {
res.render(req.body);

console.log(req.body);
	const localImage = req.body.imgSource;
	const imageRemoteName = `${new Date().getTime()}.` + req.body.extName;

	AWS.config.update({
	  accessKeyId: ACCESS_KEY,
	  secretAccessKey: SECRET_KEY,
	  region: REGION
	});

	var s3 = new AWS.S3();

	s3.putObject({
	  Bucket: BUCKET,
	  Body: fs.readFileSync(localImage),
	  Key: imageRemoteName
	})
	  .promise()
	  .then(res => {
	res.render('index', {
                    title: 'Picopy',
                    user:req.session.user
                });
	    console.log(`done! - `, res);
	    console.log(
	      `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: 	imageRemoteName })}`
	    );
	  })
	  .catch(err => {
	    console.log('failed:', err)
	  })

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



