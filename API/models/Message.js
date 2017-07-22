const mongoose = require('./init');

const messageSchema = mongoose.Schema({
  message: String,
  for: {
    id: String,
    role: String
  },
  from: String,
  time: {
    type: Date,
    default: Date.now
  },
});

Message = mongoose.model('Message', messageSchema);

module.exports = Message;
