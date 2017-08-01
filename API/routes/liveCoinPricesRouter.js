const express = require('express')
const fetch = require('node-fetch')

const router = express.Router()

var audRate = 0

// get AUD convertion rate from api
fetchAudRate = () => {
  return fetch('http://api.fixer.io/latest?base=USD')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json into aud multiplier
      audRate = parseFloat(json.rates.AUD)
      // set emitter to wait for event
      return audRate
    })
}

// get BTC rates from bitfinex
router.get('/livecoinprices/bitfinex/btc', (req,res) => {
  // get convertion rate when api is called
  Promise.all([
    fetchAudRate(),
    fetch('https://api.bitfinex.com/v1/pubticker/btcusd')
      .then((apiRes) => apiRes.json())
  ])
  .then(([audRate, json]) => {
    // massage incoming json data to pure name value pairs
    var priceUsd = parseFloat(json.ask)
    var priceAud = priceUsd * audRate
    res.json({
      audRate,
      audPrice: priceAud,
      usdPrice: priceUsd
    })
  })
  .catch((error) => {
    res.json({ error:error })
  })
})

// get BTC rates from btc-e
router.get('/livecoinprices/btc-e/btc', (req,res) => {
  // get convertion rate when api is called
  Promise.all([
    fetchAudRate(),
    fetch('https://btc-e.com/api/3/ticker/btc_usd', {timeout: 5000})
      .then((apiRes) => apiRes.json())
  ])
  .then(([audRate, json]) => {
    // massage incoming json data to pure name value pairs
    var priceUsd = json.btc_usd.buy
    var priceAud = priceUsd * audRate
    res.json({
      audRate,
      audPrice: priceAud,
      usdPrice: priceUsd
    })
  })
  .catch((error) => {
    res.json({ error:error })
  })
})

// get BTC rates from bitstamp
router.get('/livecoinprices/bitstamp/btc', (req,res) => {
  // get convertion rate when api is called
  Promise.all([
    fetchAudRate(),
    fetch('https://www.bitstamp.net/api/v2/ticker/btcusd')
      .then((apiRes) => apiRes.json())
  ])
  .then(([audRate, json]) => {
    // massage incoming json data to pure name value pairs
    var priceUsd = parseFloat(json.ask)
    var priceAud = priceUsd * audRate
    res.json({
      audRate,
      audPrice: priceAud,
      usdPrice: priceUsd
    })
  })
  .catch((error) => {
    res.json({ error:error })
  })
})

// get ETH rates from bitfinex
router.get('/livecoinprices/bitfinex/eth', (req,res) => {
  // get convertion rate when api is called
  Promise.all([
    fetchAudRate(),
    fetch('https://api.bitfinex.com/v1/pubticker/ethusd')
      .then((apiRes) => apiRes.json())
  ])
  .then(([audRate, json]) => {
    // massage incoming json data to pure name value pairs
    var priceUsd = parseFloat(json.ask)
    var priceAud = priceUsd * audRate
    res.json({
      audRate,
      audPrice: priceAud,
      usdPrice: priceUsd
    })
  })
  .catch((error) => {
    res.json({ error:error })
  })
})


// get ETH rates from btc-e
router.get('/livecoinprices/btc-e/eth', (req,res) => {
  // get convertion rate when api is called
  Promise.all([
    fetchAudRate(),
    fetch('https://btc-e.com/api/3/ticker/eth_usd', {timeout: 5000})
      .then((apiRes) => apiRes.json())
  ])
  .then(([audRate, json]) => {
    // massage incoming json data to pure name value pairs
    var priceUsd = json.eth_usd.buy
    var priceAud = priceUsd * audRate
    res.json({
      audRate,
      audPrice: priceAud,
      usdPrice: priceUsd
    })
  })
  .catch((error) => {
    res.json({ error:error })
  })
})

// Bitstamp doesnt sell ETH!!!!

module.exports = router
