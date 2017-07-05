const express = require('express')
const Message = require('../models/Message')
const router = express.Router()

// create new messages
router.post('/message/new', (req, res) => {
  const newMessage = req.body
  Message.create(newMessage)
  .then((client) => {
    res.json(client)
  })
  .catch((err) => {
    res.json({ err: "You fucked up" })
  })
})

module.exports = router
