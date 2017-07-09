const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtSecret = 'SECRET!' // TODO: Set this up in .env later
const jwtAlgorithm = 'HS256'

// Create a valid JWT
function signtokenHandler(req, res) {
  const user = req.user
  const token = jwt.sign(
    { // Payload
      email: user.email
    },
    jwtSecret,
    { // Options
      subject: user._id.toString(),
      algorithm: jwtAlgorithm,
      expiresIn: '1h' // change this according to our clients requirements
    }
  )
  res.json({ token: token })
}

// Add local strategy(email, password, firstname and last name)
passport.use(User.createStrategy())

// Add JWT strategy (json web token)
passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: jwtSecret,
      // Authorization: JWT [token]
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
      algorithms: [jwtAlgorithm]
    },
    // Called when a valid token is found
    // It decodes the token payload for us
    (jwtPayload, done) => {
      const userID = jwtPayload.sub // User ID is the sub(subject)
      // Look up the user in our database
      User.findById(userID)
        .then(user => {
          // User was found
          if (user) {
            done(null, user)
          }
          // No user was found
          else {
            done(null, false)
          }
        })
        .catch(error => {
          done(new Error(`Issue fetching user with ID: ${userID}`), false)
        })
    }
  )
)

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
  authenticateJWT: passport.authenticate('jwt', {session: false}),
  register: registerMiddleware,
  signtokenHandler: signtokenHandler
}