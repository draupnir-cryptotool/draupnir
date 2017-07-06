const mongoose = require('./init');

const clientSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  email: String,
  status: {
    phonecall: Boolean,
    email: Boolean,
    depositCleared: Boolean,
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
