const mongoose = require('./init');
const shortid = require('shortid')

const clientSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  email: String,
  uniqId: {
    type: String,
    default: shortid.generate()
  },
  status: {
    phonecall: Boolean,
    email: Boolean,
    depositCleared: Boolean,
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
