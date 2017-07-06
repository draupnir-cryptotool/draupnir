const mongoose = require('mongoose');

const graphSchema = mongoose.Schema({
  lastTrade: {
    amount: Number,
    currency: String,
    time: {
      type: Date,
      default: Date.now,
    },
  }
});

const GraphData = mongoose.model('Graph', graphSchema);

module.exports = GraphData;
