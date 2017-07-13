const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

// get USD to AUD conversion rate from api
fetchAudRate = () => {
  return fetch('http://api.fixer.io/latest?base=USD')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json into aud multiplier
      let audRate = parseFloat(json.rates.AUD)
      // set emitter to wait for event
      return audRate
    })
}

// get AUD to USD conversion rate from api
fetchUsdRate = () => {
  return fetch('http://api.fixer.io/latest?base=AUD')
    .then((apiRes) => apiRes.json())
    .then((json) => {
      // massage incoming json into aud multiplier
      let usdRate = parseFloat(json.rates.USD)
      // set emitter to wait for event
      return usdRate
    })
}

router.get('/forexrates', (req,res) => {
  // get convertion rate when api is called
  Promise.all([fetchAudRate(), fetchUsdRate()])
  .then((forexRates) => {
    res.send(JSON.stringify({
      usdToAud: forexRates[0],
      audToUsd: forexRates[1],
    }))
  })
  .catch((error) => {
    res.json({ error:error })
  })
})

module.exports = router;
