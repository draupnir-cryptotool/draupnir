const mongoose = require('./init')

const messageSchema = mongoose.Schema({
  message: String,
  clientId: String,
  adminId: String,
  time: {
    type: Date,
    default: Date.now
  }
})

Message = mongoose.model('Message', messageSchema)

module.exports = Message
