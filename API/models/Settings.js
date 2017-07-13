const mongoose = require('./init')

settingsSchema = mongoose.Schema({
  bitfinexFloat: { type: Number, default: 0 },
  btceFloat: { type: Number, default: 0 },
  bitstampFloat: { type: Number, default: 0 }
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
