// Handle routes
const express = require('express');
const router = express.Router();
// Handle API requests
const fetch = require('node-fetch');

router.get('/ausPrices', function(req, res, next) {
  let ausPrices = {
    acxBestSell: 0,
    btcmBestSell: 0,
    irBestSell: 0,
    average: 0,
  };

  const acxFetch = fetch('https://acx.io:443//api/v2/tickers.json')
    .then((res) => res.json())
    .then((json) => {
      ausPrices.acxBestSell = parseFloat(json.btcaud.ticker.sell);
      return;
    })
    .catch((err) => console.log(err));

  const btcmFetch = fetch('https://api.btcmarkets.net/market/BTC/AUD/tick')
    .then((res) => res.json())
    .then((json) => {
      ausPrices.btcmBestSell = json.bestAsk;
      return;
    })
    .catch((err) => console.log(err));

  const irFetch = fetch('https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=xbt&secondaryCurrencyCode=aud')
    .then((res) => res.json())
    .then((json) => {
      // ausPrices.irBestSell = json.CurrentLowestOfferPrice;
      return;
    })
    .catch((err) => console.log(err));

  exchangeAPIs = [
    acxFetch,
    btcmFetch,
    irFetch,
  ];

  Promise.all(exchangeAPIs)
    .then((values) => {
      priceSum = Object.values(ausPrices).reduce((total, current) => {
        return total + current;
      });
      // This will show us how many exchanges return a non-zero price. This
      // lets us disable exchanges that we don't want to include in the average
      // calculation by simply commenting out their code that writes their value
      // to the ausPrices object.
      let priceValues = Object.values(ausPrices);
      let nonZeroExchanges = priceValues.reduce((nonZeroCount, price) => {
        price > 0 ? nonZeroCount += 1 : 0;
        return nonZeroCount;
      }, 0);

      ausPrices.average = (priceSum / nonZeroExchanges).toFixed(2);
      res.send(ausPrices);
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;
