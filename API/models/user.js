const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true, // Emails are case insensitive
  session: false, // Using jwt not seesions
});

const User = mongoose.model('User', userSchema)

module.exports = User;
