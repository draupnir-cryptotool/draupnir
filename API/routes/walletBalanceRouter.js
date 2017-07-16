const express = require('express')
const fetch = require('node-fetch')
const Settings = require('../models/Settings')
const router = express.Router()

// Wallet address coming from DB
const bitcoin = process.env.BITCOIN_ADDRESS
function extractBitcoinData(json) {
  const balance = json[bitcoin].final_balance
  return { final_balance: balance }
}
router.get('/bitcoinBalance', (req, res) => {
  Settings.findById({_id: "59642ab99039a21b6839c24e" })
  .then((settings) => {
    return fetch(`https://blockchain.info/balance?active=${bitcoin}`)
  })
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      const balance = json[bitcoin].final_balance
      const num = balance / Math.pow(10,8)
      res.json({ final_balance: num })
    })
    .catch((error) => {
      res.json({ error:error })
    })
})

// wallet address coming from DB
router.get('/ethereumBalance', (req, res) => {
  Settings.findById({_id: "59642ab99039a21b6839c24e"})
  .then((settings) => { 
    return fetch(`https://etherchain.org/api/account/${settings.ethWalletAddress}`)
  })
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      const balance = json.data[0].balance
      const num = balance / Math.pow(10,18)
      res.json( {balance: num} )
    })
    .catch((error) => {
      res.json({ error:error })
    })
})



module.exports = router