const express = require('express')
const Message = require('../models/Message')
const router = express.Router()


// find all messages belonging to this particular id
router.get('/messages/:clientid', (req, res) => {
  const id = req.params.clientid
  Message.find({ for: id })
  .then((messages) => {
    res.json(messages)
  })
  .catch((err) => {
    resp.json({err: "Absolute fucking moron!!"})
  })
})

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

// Update message
router.post('/message/:id', (req, res) => {
  Message.findByIdAndUpdate(req.params.id, { message: req.body.message })
  .then((newMessage) => {
    res.json(newMessage)
  })
  .catch((err) => {
    res.json({err: err})
  })
})

// delete a particular message
router.delete('/message/:id', (req, res) => {
  Message.findByIdAndRemove(req.params.id)
  .catch((err) => {
    if(err) {
      resp.json({err: err})
    }
  })
})
module.exports = router
