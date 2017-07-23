const express = require('express')
const Message = require('../models/Message')
const router = express.Router()

// get all messages
router.get('/messages/admin', (req, res) => {
  Message.find({"for.role": "admin"})
  .then((messages) => {
    res.json(messages)
  })
  .catch((err) => {
    res.json({error: err})
  })
})

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

// create new messages for Admins only
router.post('/message/admin', (req, res) => {
  const newMessage = req.body
  Message.create({message: req.body.message, from: req.body.from, for: {role:  "admin" }})
  .then((message) => {
    res.json(message)
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
