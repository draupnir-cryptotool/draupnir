const express = require('express')
const Order = require('../models/Order')
const router = express.Router()


// Create new order
router.post('/order/new', (req, res) => {
  const newOrder = req.body
  Order.create(newOrder)
  .then((order) => {
    res.json(order)
  })
  .catch((err) => {
    res.json({err: "Yep! Fucked up"})
  })
})

module.exports = router