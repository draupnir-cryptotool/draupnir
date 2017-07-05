// Initializing mongoose here so dont have to continually write
const mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.connect(process.env.DATABASE)

const db = mongoose.connection

module.exports = mongoose
