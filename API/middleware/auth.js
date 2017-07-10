const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/user');


const jwtSecret = 'SECRET!' // TODO: Set this up in .env later
const jwtAlgorithm = 'HS256'

function signToken(user, { hasVerified2FA = false }) {
  return jwt.sign(
    { // Payload   
      email: user.email,
      hasVerified2FA: hasVerified2FA
    },
    jwtSecret,
    { // Options
      subject: user._id.toString(),
      algorithm: jwtAlgorithm,
      expiresIn: '1h' // change this according to our clients requirements
    }
  )
}

// Create a valid JWT
function signtokenHandler(req, res) {
  const user = req.user
  const otpTokenVerified = req.otpTokenVerified
  const token = signToken(user, { hasVerified2FA: otpTokenVerified })
  res.json({ token: token })
}

function askForOTPHandler(req, res) {
  res.json({ needsOTP: true })
}

function verifyOTP(req, res, next) {
  const user = req.user
  const two_factor_secret = user.two_factor_secret
  if (!two_factor_secret) {
    next(new Error('2 factor OTP is not enabled for this account'))
    return
  }

  const otp = req.body.OTP // Six digit code
  // Verify OTP using code from that example
  const tokenValidates = speakeasy.totp.verify({
    //secret: secret.base32,
    secret: two_factor_secret,
    encoding: 'base32',
    token: otp,
    window: 6
  });
  if (!tokenValidates) {
    next(new Error('2 factor OTP was not correct'))
    return
  }

  // OTP verified
  req.otpTokenVerified = true
  next()
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
    lastname: req.body.lastname,
    two_factor_secret: req.body.two_factor_secret
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
  askForOTPHandler: askForOTPHandler,
  verifyOTP: verifyOTP,
  signtokenHandler: signtokenHandler
}