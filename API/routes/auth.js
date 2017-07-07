const express = require('express')
const authMiddleware = require('../middleware/auth')
const router = express.Router()

// Registration: POST /auth/register
router.post('/auth', authMiddleware.register, (req,res) => {
  res.json({ user: req.user })
})

// Sign in: POST /auth
router.post('/signin', authMiddleware.authenticateSignIn, (req,res) => {
  res.json({ success: true })
})


module.exports = router