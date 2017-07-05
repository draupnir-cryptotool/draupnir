const express = require('express')
const User = require('../models/user')
const Router = express.Router()

// create new user
Router.post('/user/new', (req, res) => {
  const newUser = req.body
  User.create(newUser)
    .then(user => {
      res.json(user)
    })
    .catch((err) => {
      res.json({error: 'Big ass error'})
    })
})


module.exports = Router
