const express = require('express')
const authMiddleware = require('../middleware/auth')
const router = express.Router()
const User = require('../models/user')
const jwtDecode = require('jwt-decode')

// TODO: Set user up for 2FA
// Registration: POST /auth/register
router.post('/register', authMiddleware.register, authMiddleware.signtokenHandler)

// For now, we’ll do this manually
//router.post('/register/2fa', authMiddleware.generateOTPSecret, authMiddleware.verifyOTP, authMiddleware.register, authMiddleware.signtokenHandler)

// Sign in: POST /auth
router.post('/signin', authMiddleware.authenticateSignIn, authMiddleware.verifyOTP, authMiddleware.signtokenHandler)

router.post('/admin/details', (req, res) => {
  const decode = jwtDecode(req.body.token)
  User.findById(decode.sub)
  .then((adminDetails) => {
    res.json(adminDetails)
  })
  .catch((err) => {
    res.json({err: err})
  })
})

module.exports = router