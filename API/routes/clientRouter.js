const express = require('express')
const Client = require('../models/Clients')
const authMiddleWare = require('../middleware/auth')
const router = express.Router()


router.get('/clients', (req,res) => {
  Client.find()
  .then((clients) => {
      res.json(clients)
    })
    .catch((error) => {
      res.json({ error: error })
    })
})

// Get a particular client
router.get('/client/:id',  (req, res) => {
  client = Client.findById(req.params.id)
  .then((clientFound) => {
    res.json(clientFound)
  })
  .catch((err) => {
    resp.json({err: 'Fukn idiot!'})
  })
})

// Create new client
router.post('/client/new', (req, res) => {
  const newclient = req.body // Copy properties from request body object
  // Generate and set clientID

  Client.create(newclient)
  .then((client) => {
    res.json(client)
  })
  .catch((err) => {
    res.json({ err: 'You fucked up' })
  })
})

// Update client details
router.put('/client/:id', (req,res) => {
  Client.findByIdAndUpdate(req.params.id, req.body)
  .then((updatedClient) => {
    res.json(updatedClient)
  })
  .catch((err) => {
    res.json({err: "fucked that up to!"})
  })
})

// Delete client from database
router.delete('/client/:id', (req, res) => {
  Client.findByIdAndRemove(req.params.id)
  .then((deletedClient) => {
    res.json(deletedClient)
  })
  .catch((err) => {
    if(err) {
      res.json({ err: "YOu fucked up.. AGAIN!!!" })
    }
  })
})

// update status
router.patch('/client/:id', (req, res) => {
  const keyName = Object.keys(req.body)[0]; //get the keyName
  const id = req.params.id
  const status = req.body[keyName]
  Client.updateStatus(id, keyName, status)
    .then(client => res.json(client))
    .catch((err) => {
      res.json({err: err})
    })
})


module.exports = router