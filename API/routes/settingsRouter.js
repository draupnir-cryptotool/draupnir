const express = require('express')
const Settings = require('../models/Settings')

const router = express.Router()

// get all data
router.get('/settings', (req, res) => {
  Settings.find()
  .then((settings) => {
    res.json(settings)
  })
  .catch((err) => {
    if(err) {
      res.json({err: err})
    }
  })
})

// Intiate value
// This will be commented out if initial post has already been done
// router.post('/settings/new', (req, res) => {
//   const newSettings = req.body
//   Settings.create(newSettings)
//     .then(settings => {
//       res.json(settings)
//     })
//     .catch((err) => {
//       res.json({error: 'Big ass error'})
//     })
// })


// edit Settings
router.patch('/settings/:id', (req, res) => {
  Settings.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((newSettings) => {
    res.json(newSettings)
  })
  .catch((err) => {
    res.json({ err: err })
  })
})

module.exports = router;