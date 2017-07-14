// Handle routes
const express = require('express');
const router = express.Router();
// Handle API requests
const fetch = require('node-fetch');

router.get('/ausPrices', function(req, res, next) {
  let ausPrices = {
    BTC: {
      acxBestBTC: 0,
      btcmBestBTC: 0,
      irBestBTC: 0,
    },
    ETH: {
      acxBestETH: 0,
      btcmBestETH: 0,
      irBestETH: 0,
    },
    averageBTC: 0,
    averageETH: 0,
  };

  const acxFetch = fetch('https://acx.io:443//api/v2/tickers.json')
    .then((res) => res.json())
    .then((json) => {
      ausPrices.BTC.acxBestBTC = parseFloat(json.btcaud.ticker.sell);
      return;
    })
    .catch((err) => console.log(err));

  const btcmFetch = fetch('https://api.btcmarkets.net/market/BTC/AUD/tick')
    .then((res) => res.json())
    .then((json) => {
      ausPrices.BTC.btcmBestBTC = json.bestAsk;
    })
    .then(fetch('https://api.btcmarkets.net/market/ETH/AUD/tick')
      .then((res) => res.json())
      .then((json) => {
        ausPrices.ETH.btcmBestETH = json.bestAsk;
        return;
      }))
    .catch((err) => console.log(err));

  const irFetch = fetch('https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=xbt&secondaryCurrencyCode=aud')
    .then((res) => res.json())
    .then((json) => {
      // ausPrices.BTC.irBestBTC = json.CurrentLowestOfferPrice;
      return;
    })
    .then(fetch('https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=eth&secondaryCurrencyCode=aud')
      .then((res) => res.json())
      .then((json) => {
        ausPrices.ETH.irBestETH = json.CurrentLowestOfferPrice;
        console.log(ausPrices);
        return;
      }))
    .catch((err) => console.log(err));

  exchangeAPIs = [
    acxFetch,
    btcmFetch,
    irFetch,
  ];

  Promise.all(exchangeAPIs)
    .then((values) => {
      priceSumBTC = Object.values(ausPrices.BTC).reduce((total, current) => {
        return total + current;
      }, 0);
      priceSumETH = Object.values(ausPrices.ETH).reduce((total, current) => {
        return total + current;
      }, 0);
      // This will show us how many exchanges return a non-zero price. This
      // lets us disable exchanges that we don't want to include in the average
      // calculation by simply commenting out their code that writes their value
      // to the ausPrices object.
      let priceValuesBTC = Object.values(ausPrices.BTC);
      let nonZeroExchangesBTC = priceValuesBTC.reduce((nonZeroCount, price) => {
        price > 0 ? nonZeroCount += 1 : 0;
        return nonZeroCount;
      }, 0);
      let priceValuesETH = Object.values(ausPrices.ETH);
      let nonZeroExchangesETH = priceValuesETH.reduce((nonZeroCount, price) => {
        price > 0 ? nonZeroCount += 1 : 0;
        return nonZeroCount;
      }, 0);

      ausPrices.averageBTC = (priceSumBTC / nonZeroExchangesBTC).toFixed(2);
      ausPrices.averageETH = (priceSumETH / nonZeroExchangesETH).toFixed(2);
      res.send(ausPrices);
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;
