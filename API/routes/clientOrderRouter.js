const express = require('express');
const ClientOrder = require('../models/ClientOrder');
const router = express.Router();

// get all client orders
router.get('/clientorders', (req, res) => {
  ClientOrder.find()
  .then((clientOrders) => {
    res.json(clientOrders);
  })
  .catch((err) => {
    res.json({error: err});
  });
});

// find all orders belonging to this particular id
router.get('/clientorders/:clientid', (req, res) => {
  const id = req.params.clientid;
  ClientOrder.find({for: id})
  .then((messages) => {
    res.json(messages);
  })
  .catch((err) => {
    resp.json({err: 'Error finding ClientOrder by ID'});
  });
});

// Create new order
router.post('/clientorders/new', (req, res) => {
  const newClientOrder = req.body;
  ClientOrder.create(newClientOrder)
  .then((clientOrder) => {
    console.log(clientOrder);
    res.json(clientOrder);
  })
  .catch((err) => {
    res.json({err: 'Error creating new ClientOrder'});
  });
});

// edit order
router.patch('/clientorders/:id', (req, res) => {
  const id = req.params.id
  ClientOrder.findByIdAndUpdate(id, { $set: req.body }, {new: true } )
    .then((client) => {
      res.json(client)
    })
    .catch((error) => {
      res.json({ error: error })
    })
});

// delete an order
router.delete('/clientorders/:id', (req, res) => {
  ClientOrder.findByIdAndRemove(req.params.id)
  .then((removedClientOrder) => {
    resp.json(removedClientOrder);
  })
  .catch((err) => {
    if (err) {
      res.json({err: err});
    }
  });
});

module.exports = router;
