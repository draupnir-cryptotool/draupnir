const express = require('express')
const Client = require('../models/Clients')
const router = express.Router()

// create new client
router.post('/client/new', (req, res) => {
  const newclient = req.body
  Client.create(newclient)
  .then((client) => {
    res.json(client)
  })
  .catch((err) => {
    res.json({ err: 'You fucked up' })
  })
})

module.exports = router