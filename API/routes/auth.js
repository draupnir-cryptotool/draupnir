const express = require('express')
const authMiddleware = require('../middleware/auth')
const router = express.Router()

// Registration: POST /auth/register
router.post('/auth', authMiddleware.register, authMiddleware.signtokenHandler)

// Sign in: POST /auth
router.post('/signin', authMiddleware.authenticateSignIn, authMiddleware.signtokenHandler)


module.exports = router