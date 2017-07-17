const mongoose = require('./init')

orderSchema = mongoose.Schema({
  amount: {
    type: String,
    default: '0'
  },
  clientId: String,
  adminId: String,
  currency: {
    type: String,
    default: 'NONE SET'
  },
  processed: {
    successful: {
      type: Boolean,
      default: false
    },
  adminId: String,
  }
});

Order = mongoose.model('Order', orderSchema);

module.exports = Order;
