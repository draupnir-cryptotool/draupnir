const express = require('express')
const fetch = require('node-fetch')
const emitter = require('events')

const router = express.Router()

var audRate = 0
// set new emmitter to listen for even
var rateEmitter = new emitter()

// get AUD convertion rate from api
getAudRate = () => {
  fetch('http://api.fixer.io/latest?base=USD')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json into aud multiplier
      audRate = parseFloat(json.rates.AUD)
      // set emitter to wait for event
      rateEmitter.emit( 'rateAcquired' )
    })
}

// calculate AUD value
converter = (amount) => {
    return amount * audRate;
}

// get BTC/AUD from bitfinex
router.get('/livecoinprices/bitfinex/btcaud', (req,res) => {
  // get convertion rate when api is called
  getAudRate()
  // invoke event emmiter to now run the following function
  rateEmitter.on( 'rateAcquired', function() {
    fetch('https://api.bitfinex.com/v1/pubticker/btcusd')
      .then((apiRes) => apiRes.json())
      .then((json) => {
        // massage incoming json data to pure name value pairs
        var priceUsd = parseFloat(json.ask)
        var priceAud = converter(priceUsd)
        res.json({ btcPrice: priceAud })
      })
      .catch((error) => {
        res.json({ error:error })
      })
  })
})

// get BTC/AUD from BTC-E
router.get('/livecoinprices/btc-e/btcaud', (req,res) => {
  // get convertion rate when api is called
  getAudRate()
  // invoke event emmiter to now run the following function
  rateEmitter.on( 'rateAcquired', function() {
    fetch('https://btc-e.com/api/3/ticker/btc_usd')
      .then((apiRes) => apiRes.json())
      .then((json) => {
        // massage incoming json data to pure name value pairs
        var priceUsd = json.btc_usd.buy
        var priceAud = converter(priceUsd)
        res.json({ btcPrice: priceAud})
      })
      .catch((error) => {
        res.json({ error:error })
      })
  })  
})

// get BTC/AUD from bitstamp
router.get('/livecoinprices/bitstamp/btcaud', (req,res) => {
  // get convertion rate when api is called
  getAudRate()
  // invoke event emmiter to now run the following function
  rateEmitter.on( 'rateAcquired', function() {
  fetch('https://www.bitstamp.net/api/v2/ticker/btcusd')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json data to pure name value pairs
      var priceUsd = json.ask
      var priceAud = converter(priceUsd)
      res.json({ btcPrice: priceAud})
    })
    .catch((error) => {
      res.json({ error:error })
    })
  })  
})

// get ETH/AUD from bitfinex
router.get('/livecoinprices/bitfinex/ethaud', (req,res) => {
  // get convertion rate when api is called
  getAudRate()
  // invoke event emmiter to now run the following function
  rateEmitter.on( 'rateAcquired', function() {
    fetch('https://api.bitfinex.com/v1/pubticker/ethusd')
      .then((apiRes) => apiRes.json())
      .then((json) => {
        // massage incoming json data to pure name value pairs
        var priceUsd = parseFloat(json.ask)
        var priceAud = converter(priceUsd)
        res.json({ btcPrice: priceAud})
      })
      .catch((error) => {
        res.json({ error:error })
      })
  })
})

// get ETH/AUD from BTC-E
router.get('/livecoinprices/btc-e/ethaud', (req,res) => {
  // get convertion rate when api is called
  getAudRate()
  // invoke event emmiter to now run the following function
  rateEmitter.on( 'rateAcquired', function() {
    fetch('https://btc-e.com/api/3/ticker/eth_usd')
      .then((apiRes) => apiRes.json())
      .then((json) => {
        // massage incoming json data to pure name value pairs
        var priceUsd = json.eth_usd.buy
        var priceAud = converter(priceUsd)
        res.json({ btcPrice: priceAud})
      })
      .catch((error) => {
        res.json({ error:error })
      })
  })
})

// Bitstamp doesnt sell ETH!!!!

module.exports = router