var AWS = require('aws-sdk')
const fs = require('fs')

const BUCKET = 'picopyimages'
const REGION = 'us-east-2'
const ACCESS_KEY = 'AKIAJ3BEYHSUGHE3F53A'
const SECRET_KEY = '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'
const key = '1586143040268.jpeg'

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
})

var s3 = new AWS.S3()
var params = { Bucket: BUCKET, Key: key };
s3.getObject(params, function(err, data){if(err) {
	console.error(err.code, "-", err.message);
	   }

	fs.writeFileSync('./public/currentimage/currentimage.jpeg', data.Body, function(err){
	if(err)
	  console.log(err.code, "-", err.message);

});
});
