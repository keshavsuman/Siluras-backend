const multerS3  = require('multer-s3');
const multer  = require('multer'); 
const aws = require('aws-sdk');
const express = require('express');
const router = express();

aws.config.update({
    secretAccessKey: 'zrAlJO6MyKL8kDDdxk3nqD84o4SbzoLOUv/3QLvr',
    accessKeyId: 'AKIAZ43POH25BYKEGG4I',
    region: 'ap-south-1'
});

const s3multer = multer({
    storage: multerS3({
      s3: s3 = new aws.S3(),
      bucket: 'siluras',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString()+'.'+file.originalname.split('.').pop())
      }
    })
  });

router.put('/',s3multer.single('file'),(req,res)=>{
  console.log(req.file);
  res.status(200).json({
    status:200,
    message:'File uploaded successfully',
    data:req.file
  });
});

module.exports = router;