const passport = require('passport')
const User = require('../models/user')

// Add local strategy
passport.use(User.createStrategy())

// Register new user
function registerMiddleware(req, res, next) {
  const user = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  })
  User.register(user, req.body.password, (error, user) => {
    // Error in registration
    if (error) {
      // Our middleware failed with this error
      next(error)
      return
    }
    // Add our newly created user to the req
    req.user = user
    // Our middleware succeeded with no error
    next()
  })
}

module.exports = {
  initialize: passport.initialize(),
  authenticateSignIn: passport.authenticate('local', {session: false}),
  register: registerMiddleware
}