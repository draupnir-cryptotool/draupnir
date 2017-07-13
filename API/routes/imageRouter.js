const express = require('express')
const Image = require('../models/image')
let multer = require('multer');

const router = express.Router()

// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
  cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
  cb(null, file.originalname);
  }
});

let upload = multer({
  storage: storage
});

router.post('/images', upload.any(), function(req, res, next) {
  res.send(req.files);
  let path = req.files[0].path;
  let imageName = req.files[0].originalname;
  
  let imagepath = {};
  imagepath['path'] = path;
  imagepath['originalname'] = imageName;
  
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