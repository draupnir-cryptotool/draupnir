// Handle routes
const express = require('express');
const router = express.Router();
// Handle API requests
const fetch = require('node-fetch');
// Adds functions for working with arrays etc.
const _ = require('lodash');

// Temporary route for testing
router.get('/btcusd/:amount', function(req, res, next) {
  // Create a fetch promise for each API call.
  // These will all be called by a Promise.all later
  const fetchBitfinex = fetch('https://api.bitfinex.com/v1/book/btcusd/?limit_bids=0')
    // The APIs return JSON, so we parse it into a JavaScript object
    .then((res) => res.json())
    // When the parsed JSON is ready we can muck around with it
    .then((json) => {
      // Just take the part of the returned order book that we want
      orderBook = json.asks;
      // Setup an array to store the orders from the exchange
      massagedOrderBook = [];

      // Massage each order returned by the exchange into a standard format
      orderBook.forEach((order) => {
        massagedOrder = {};
        massagedOrder.exchange = 'Bitfinex';
        massagedOrder.price = parseFloat(order.price);
        massagedOrder.amount = parseFloat(order.amount);
        massagedOrder.orderTotal = massagedOrder.price * massagedOrder.amount;

        massagedOrderBook.push(massagedOrder);
      });
      return massagedOrderBook;
    });

  const fetchBitstamp = fetch('https://www.bitstamp.net/api/order_book/')
    .then((res) => res.json())
    .then((json) => {
      orderBook = json.asks;
      massagedOrderBook = [];

      orderBook.forEach((order) => {
        massagedOrder = {};
        massagedOrder.exchange = 'Bitstamp';
        massagedOrder.price = parseFloat(order[0]);
        massagedOrder.amount = parseFloat(order[1]);
        massagedOrder.orderTotal = massagedOrder.price * massagedOrder.amount;

        massagedOrderBook.push(massagedOrder);
      });
      return massagedOrderBook;
    });

  const fetchBTCe = fetch('https://btc-e.com/api/3/depth/btc_usd/?limit=100')
    .then((res) => res.json())
    .then((json) => {
      orderBook = json.btc_usd.asks;
      massagedOrderBook = [];

      orderBook.forEach((order) => {
        massagedOrder = {};
        massagedOrder.exchange = 'BTC-e';
        massagedOrder.price = order[0];
        massagedOrder.amount = order[1];
        massagedOrder.orderTotal = massagedOrder.price * massagedOrder.amount;

        massagedOrderBook.push(massagedOrder);
      });
      return massagedOrderBook;
    });

  // Wait for all the API calls to return before we play with the data
  Promise.all([fetchBTCe, fetchBitfinex, fetchBitstamp])
    .then((orderBooks) => {
      // Promise.all gives us an array of the returned values,
      // so we flatten them into a single array
      fullOrderBook = _.flattenDeep(orderBooks);
      // We now have a single array of objects,
      // so we sort them by their price property
      fullOrderBook = _.sortBy(fullOrderBook, ['price']);

      orderAmount = req.params.amount;
      fulfilledOrderBook = [];
      orderTally = 0;

      for (let order of fullOrderBook) {
        if (orderTally >= orderAmount) {
          break;
        } else if (order.orderTotal < (orderAmount - orderTally)) {
          orderTally += order.orderTotal;
          fulfilledOrderBook.push(order);
          // Order is more than what we need to fulfil requested amount,
          // we only need part of it
        } else {
          partialOrder = order;
          partialOrder.amount = (orderAmount - orderTally) / partialOrder.price;
          partialOrder.orderTotal = partialOrder.price * partialOrder.amount;
          orderTally += partialOrder.orderTotal;
          fulfilledOrderBook.push(partialOrder);
        }
      };

      reducedOrders = fulfilledOrderBook.reduce((result, x) => {
        result[x['exchange']] = result[x['exchange']] ? result[x['exchange']] + x['orderTotal'] :  x['orderTotal'];
        return result;
      }, {});

      reducedOrders.currencyTotal = fulfilledOrderBook.reduce((currencyTotal, order) => {
        return currencyTotal + order.amount;
      }, 0);

      res.send(reducedOrders);
  });
});

module.exports = router;
