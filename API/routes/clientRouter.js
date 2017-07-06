const express = require('express')
const Client = require('../models/Clients')
const router = express.Router()



router.get('/client/:id', (req, res) => {
  client = Client.findById(req.params.id)
  .then((clientFound) => {
    res.json(clientFound)
  })
  .catch((err) => {
    resp.json({err: 'Fukn idiot!'})
  })
})

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