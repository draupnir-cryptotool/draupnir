const express = require('express')
const Image = require('../models/image')
let multer = require('multer');
var imager = require('multer-imager');

const router = express.Router()


var upload = multer({
  storage: imager({
    dirname: 'uploads',
    bucket: 'draupnir-cfa2',
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
    region: 'ap-southeast-2',
    gm: {                                 // [Optional]: define graphicsmagick options
      width: 200,                         // doc: http://aheckmann.github.io/gm/docs.html#resize
      height: 200,
      options: '!',
      format: 'jpg'                       // Default: jpg
    },
    // s3 : {                                // [Optional]: define s3 options
    //   Metadata: {                         // http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html
    //     'customkey': 'data'               // "x-amz-meta-customkey","value":"data"
    //   }
    // }
  })
});


// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
  cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
  cb(null, file.originalname);
  }
});

// let upload = multer({
//   storage: storage
// });

router.post('/images', upload.single('image'), function(req, res, next) {
  console.log(req.file)
  // res.send(req.file);
  const imageName = req.file.originalname;
  const location = req.file.location;
  const body = req.body
  console.log(body)
  let imagepath = {};
  imagepath['s3URL'] = location;
  imagepath['originalname'] = imageName;
  imagepath['idType'] = body.idType
  imagepath['clientId'] = body.clientId
  //imagepath contains two objects, path and the imageName
  //passing two objects in the addImage method.. which is defined above..
  Image.create(imagepath)
    .then((image) => {
    res.json(image)
    })
    .catch((err) => {
    res.json({err: err})
    })
});


//URL : http://localhost:8000/api/images/
// To get all the images/files stored in MongoDB
router.get('/images', (req, res) => {
  Image.find()
  .then((images) => {
    res.json(images)
  })
  .catch((err) => {
    res.json({ err: err })
  })
});

module.exports = router