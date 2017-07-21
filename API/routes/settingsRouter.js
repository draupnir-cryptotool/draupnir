const express = require('express')
const fetch = require('node-fetch')
const Settings = require('../models/Settings')
const router = express.Router()

// get all data
router.get('/settings', (req, res) => {
  Settings.find()
  .then((settings) => {
    res.json(settings[0])
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

// wallet address coming from DB
// calculate our btc wallet balance
router.get('/bitcoinBalance', (req, res) => {
  Settings.findById({_id: "59703a98ae87e52a7dfe210a" })
  .then((settings) => {
    return fetch(`https://blockchain.info/balance?active=${settings.btceWalletAddress}`)
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      const balance = json[settings.btceWalletAddress].final_balance
      const num = balance / Math.pow(10,8)
      res.json({ btceWalletBalance: num })
    })
  })
    .catch((error) => {
      res.json({ error:error })
    })
})

// wallet address coming from DB
// calculate our eth wallet balance
router.get('/ethereumBalance', (req, res) => {
  Settings.findById({_id: "59703a98ae87e52a7dfe210a"})
  .then((settings) => { 
    return fetch(`https://etherchain.org/api/account/${settings.ethWalletAddress}`)
  })
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      const balance = json.data[0].balance
      const num = balance / Math.pow(10,18)
      res.json( { ethWalletBalance: num } )
    })
    .catch((error) => {
      res.json({ error:error })
    })
})

module.exports = router;