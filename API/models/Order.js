const mongoose = require('mongoose')

orderSchema = mongoose.Schema({
  amount: String,
  clientId: String,
  adminId: String,
  currency: String,
  processed: {
    successful: Boolean,
    adminId: String
  }
})

Order = mongoose.model('Order', orderSchema)

module.exports = Order