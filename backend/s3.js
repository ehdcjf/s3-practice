require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
//  const uploadFile = (file,tokenId,i)=>{
//   const fileStream = fs.createReadStream(file.path)
//   const mimetype = file.mimetype.split('/')[1];
//   const image_num = `${i+1}`.padStart(3,'0')
//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: `${tokenId}/image_${image_num}.${mimetype}`
//   }
  
//   return s3.upload(uploadParams).promise();
// }

const uploadFile = (file) =>{
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return  s3.upload(uploadParams).promise()
}

const uploadNFT = (description,files)=>{
  const uploadParams = {
    Bucket: bucketName,
    Body: JSON.stringify({title:"안녕",description,files}),
    Key: 'test.json'
  }
  return s3.upload(uploadParams).promise()
}


module.exports={
  uploadFile,
  uploadNFT
}


