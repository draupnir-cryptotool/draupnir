const mongoose = require('./init')

//path and originalname are the fields stored in mongoDB
var imageSchema = mongoose.Schema({
  s3URL: {
    type: String,
    required: true,
    trim: true
  },
  originalname: {
    type: String,
    required: true
  },
  clientId: String,
  idType: String
});
var Image = mongoose.model('Image',imageSchema);

module.exports = Image;