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
    quoteSent: {
      type: Boolean,
      default: false
    } ,
    quoteAccepted: {
      type: Boolean,
      default: false
    },
    depositCleared: {
      type: Boolean,
      default: false
    },
    idVerified: {
      type: Boolean,
      default: false
    }
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
