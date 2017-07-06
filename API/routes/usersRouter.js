const express = require('express')
const User = require('../models/user')
const router = express.Router()

// get all users
router.get('/users', (req, res) => {
  User.find()
  .then((users) => {
    res.json(users)
  })
  .catch((err) => {
    if(err) {
      res.json({err: err})
    }
  })
})

// create new user
router.post('/user/new', (req, res) => {
  const newUser = req.body
  User.create(newUser)
    .then(user => {
      res.json(user)
    })
    .catch((err) => {
      res.json({error: 'Big ass error'})
    })
})

// Delete user
router.delete('/user/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then((user) => {
    res.json({message: 'user successfully deleted'})
  })
  .catch((err) => {
    res.json({err: 'Its deleted now you idiot!'})
  })
})

module.exports = router;
