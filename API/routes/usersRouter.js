const express = require('express')
const User = require('../models/user')
const router = express.Router()

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

router.delete('/user/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then((user) => {
    res.json({message: 'user successfully deleted'})
  })
  .catch((err) => {
    res.json({err: 'Its deleted now you idiot!'})
  })
})

module.exports = router
