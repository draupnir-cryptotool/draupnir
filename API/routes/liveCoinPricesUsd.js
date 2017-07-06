const express = require('express')
const fetch = require('node-fetch')

const router = express.Router()

// get btc/usd from bitfinex
router.get('/livecoinprices/bitfinex/btcusd', (req,res) => {
  fetch('https://api.bitfinex.com/v1/pubticker/btcusd')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      let number = parseFloat(json.ask)
      res.json({ btcPrice: number })
    })
    .catch((error) => {
      res.json({ error:error })
    })
})

// get btc/usd from BTC-E
router.get('/livecoinprices/btc-e/btcusd', (req,res) => {
  fetch('https://btc-e.com/api/3/ticker/btc_usd')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      let number = json.btc_usd.buy
      res.json({ btcPrice: number})
    })
    .catch((error) => {
      res.json({ error:error })
    })
})

// get btc/usd from bitstamp
router.get('/livecoinprices/bitstamp/btcusd', (req,res) => {
  fetch('https://www.bitstamp.net/api/v2/ticker/btcusd')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      let number = json.ask
      res.json({ btcPrice: number})
    })
    .catch((error) => {
      res.json({ error:error })
    })
})

// get eth/usd from bitfinex
router.get('/livecoinprices/bitfinex/ethusd', (req,res) => {
  fetch('https://api.bitfinex.com/v1/pubticker/ethusd')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      let number = parseFloat(json.ask)
      res.json({ ethPrice: number })
    })
    .catch((error) => {
      res.json({ error:error })
    })
})

// get eth/usd from BTC-E
router.get('/livecoinprices/btc-e/ethusd', (req,res) => {
  fetch('https://btc-e.com/api/3/ticker/eth_usd')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      let number = json.eth_usd.buy
      res.json({ ethPrice: number})
    })
    .catch((error) => {
      res.json({ error:error })
    })
})


// Bitstamp doesnt sell ETH!!!!


module.exports = router