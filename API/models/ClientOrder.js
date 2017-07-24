const mongoose = require('./init');

const clientOrderSchema = mongoose.Schema({
  clientId: String,
  amount: Number,
  coin: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

ClientOrder = mongoose.model('ClientOrder', clientOrderSchema);

module.exports = ClientOrder;
