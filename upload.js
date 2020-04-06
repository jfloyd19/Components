var AWS = require('aws-sdk')
const fs = require('fs')

const BUCKET = 'picopyimages'
const REGION = 'us-east-2'
const ACCESS_KEY = 'AKIAJ3BEYHSUGHE3F53A'
const SECRET_KEY = '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'

const localImage = './public/currentimage/current_image.png'
const imageRemoteName = `${new Date().getTime()}.png`

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
})

var s3 = new AWS.S3()

s3.putObject({
  Bucket: BUCKET,
  Body: fs.readFileSync(localImage),
  Key: imageRemoteName
})
  .promise()
  .then(response => {
    console.log(`done! - `, response)
    console.log(
      `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName })}`
    )
  })
  .catch(err => {
    console.log('failed:', err)
  })


