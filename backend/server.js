const express = require('express')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, uploadNFT } = require('./s3')
const app = express()


app.post('/images', upload.array('image'), async (req, res) => {

  const files = [];
  for(let i = 0; i<req.files.length; i++){
    const v = req.files[i];
    const tokenId = 10011
    const response =await uploadFile(v,tokenId,i);
    files.push(response.Location)
    await unlinkFile(v.path)
  }

  const description = req.body.description
  const result = await uploadNFT(description,files)
  console.log(result)
  res.send('ok')
})

app.listen(8080, () => console.log("listening on port 8080"))