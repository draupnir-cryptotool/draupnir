const mongoose = require('./init');

const clientOrderSchema = mongoose.Schema({
  clientId: String,
  amount: Number,
  coin: String,
  created: {
    type: Date,
    default: Date.now,
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
    orderComplete: {
      type: Boolean,
      default: false
    }
  }
});

ClientOrder = mongoose.model('ClientOrder', clientOrderSchema);

module.exports = ClientOrder;
