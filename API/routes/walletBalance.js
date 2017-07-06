const express = require('express')
const fetch = require('node-fetch')

const router = express.Router()

// make bitcoin wallet address private
const bitcoin = process.env.BITCOIN_ADDRESS

function extractBitcoinData(json) {
  const balance = json[bitcoin].final_balance
  return { final_balance: balance }
}

router.get('/bitcoinBalance', (req, res) => {
  fetch(`https://blockchain.info/balance?active=${bitcoin}`)
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

// make ether wallet address private
const ether = process.env.ETHER_ADDRESS

router.get('/ethereumBalance', (req, res) => {
  fetch(`https://etherchain.org/api/account/${ether}`)
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