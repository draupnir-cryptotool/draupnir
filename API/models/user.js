const mongoose = require('./init')
const passportLocalMongoose = require('require-local-mongoose')

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String
})
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  session: false
})

const User = mongoose.model('User', userSchema)
