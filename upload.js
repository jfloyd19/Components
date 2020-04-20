var AWS = require('aws-sdk')
const fs = require('fs')

const BUCKET = 'picopy'
const REGION = 'us-east-2'
const ACCESS_KEY = 'AKIAI7XMHO6HJZGSENCQ'
const SECRET_KEY = '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'

const localImage = 'canvas.png'
const imageRemoteName ='canvas.png'

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


