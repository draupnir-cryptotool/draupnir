const express = require('express')
const Order = require('../models/Order')
const router = express.Router()


// get all orders
router.get('/orders', (req, res) => {
  Order.find()
  .then((allOrders) => {
    res.json(allOrders)
  })
  .catch((err) => {
    res.json({ err: err })
  })
})

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

// edit order
router.patch('/order/:id', (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((newOrder) => {
    res.json(newOrder)
  })
  .catch((err) => {
    res.json({ err: err })
  })
})

// delete an order
router.delete('/order/:id', (req, res) => {
  Order.findByIdAndRemove(req.params.id)
  .then((removedOrder) => {
    resp.json(removedOrder)
  })
  .catch((err) => {
    if(err) {
      res.json({ err: err })
    }
  })
})


module.exports = router
