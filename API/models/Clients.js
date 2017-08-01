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
});


// reusable for x3 properties
clientSchema.statics.updateStatus = function(id, keyName, status) {
  const options = {new: true}
  const key = 'status.' + [keyName]
  console.log(id, keyName, status, key)

  const Client = this.model('Client')
  Client.findById(id)
    .then(client => {
      console.log('findById', id, client);
    })
  
  return Client
    .findOneAndUpdate(id, {$set: {[key]: status}}, options )
    .then(client => {(client)
    console.log('findOneAndUpdate', id, client);}
  ) //returns promise with client
}

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
