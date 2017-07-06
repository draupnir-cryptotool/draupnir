const mongoose = require('mongoose');

const graphSchema = mongoose.Schema({
  askPrice: {
    amount: Number,
    currency: String,
    time: {
      type: Date,
      default: Date.now,
    }
  },
});

const GraphData = mongoose.model('Graph', graphSchema);

module.exports = GraphData;
