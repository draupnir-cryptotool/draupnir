// Handle routes
const express = require('express');
const router = express.Router();
// Handle API requests
const fetch = require('node-fetch');
// Adds functions for working with arrays etc.
const _ = require('lodash');

// Route for generating orders
// Example API call:
// draupnir.com/api/order?buying=btc&tally=usd&amount=20000&btceLimit=5000&bitstampLimit=5000&bitfinexLimit=5000
router.get('/order', function(req, res, next) {
  // Grab everything in the query string
  qs = req.query;
  // Create a fetch promise for each API call.
  // These will all be called by a Promise.all later
  const fetchBitfinex = fetch(`https://api.bitfinex.com/v1/book/${qs.buying}usd/?limit_bids=0`)
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
        massagedOrder.exchange = 'bitfinex';
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
        massagedOrder.exchange = 'bitstamp';
        massagedOrder.price = parseFloat(order[0]);
        massagedOrder.amount = parseFloat(order[1]);
        massagedOrder.orderTotal = massagedOrder.price * massagedOrder.amount;

        massagedOrderBook.push(massagedOrder);
      });
      // Bitstamp, in their infinite wisdom, don't sell ETH, so we don't return
      // anything unless it is a BTC trade
      if (qs.buying != 'btc') {
        return;
      };
      return massagedOrderBook;
    });

  const fetchBTCe = fetch(`https://btc-e.com/api/3/depth/${qs.buying}_usd/?limit=5000`)
    .then((res) => res.json())
    .then((json) => {
      orderBook = json[`${qs.buying}_usd`].asks;
      massagedOrderBook = [];

      orderBook.forEach((order) => {
        massagedOrder = {};
        massagedOrder.exchange = 'btce';
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

      // This is where will will put all the orders we want to buy, up to the
      // amount requested
      fulfilledOrderBook = [];

      // This object is where we will keep a tally of all the money spent over
      // each exchange, so we can check limits.
      let tally = {
        total: 0,
        btce: 0,
        bitstamp: 0,
        bitfinex: 0,
      };

      // Pull the individual exchange limits out of the query string so that its
      // easier to check them below.
      const limits = {
        btce: qs.btceLimit,
        bitstamp: qs.bitstampLimit,
        biftinex: qs.bitfinex,
      };

      // Iterate through the complete order book. 'for...of' lets us 'break' out
      // of the loop, 'forEach' wouldn't
      for (let order of fullOrderBook) {
        // Work out how much is left to order in total and also from this
        // particular exchange
        let tallyRemaining = qs.amount - tally.total;
        let exchangeDifference = limit[order.exchange] - tally[order.exchange];

        // If we have hit our requested order amount, or gone over slightly, we
        // can stop looking at orders
        if (tally.total >= qs.amount) {
          break;
        };

        // Check if the exchange this order is from is over its limit and jump 
        // to the next order if it is.
        if (exchangeDifference <= 0) {
        // if (tally[order.exchange] >= limits[order.exchange]) {
          continue;
        }

        // If the order is more than we have left in the exchange limit. We 
        // can just take the remaining limit amount from this order, up to the 
        // order amount
        if (order.orderTotal > exchangeDifference) {
          partialOrder.amount = tallyRemaining / partialOrder.price;

        }

        // Order is more than what we need to fulfil requested amount, we only
        // need part of it
        if (order.orderTotal > tallyRemaining) {
          let partialOrder = order;
          // Tally by fiat
          if (qs.tally === 'usd') {
            partialOrder.amount = tallyRemaining / partialOrder.price;
          // Tally by crypto
          } else if (qs.tally === 'btc' || qs.tally === 'eth') {
            partialOrder.amount = qs.amount - tally.total;
          } else {
              // THROW ERROR
          }
          partialOrder.orderTotal = partialOrder.price * partialOrder.amount;
          qs.tally === 'usd' ?
            tally.total += order.orderTotal :
            qs.tally === 'btc' || qs.tally === 'eth' ?
                tally.total += order.amount :
                ''; // THROW ERROR
          fulfilledOrderBook.push(partialOrder);

          // If the order in the book is less than the requested amount, grab
          // the whole order and move onto the next one
        } else {
          // Check if the order amount is measured in fiat or crypto and tally
          // accordingly
          qs.tally === 'usd' ?
            tally.total += order.orderTotal :
            qs.tally === 'btc' || qs.tally === 'eth' ?
              tally.total += order.amount :
              ''; // THROW ERROR

          fulfilledOrderBook.push(order);
        }
      };

      // Tally the total order amount for each exchange
      reducedOrders = fulfilledOrderBook.reduce((exchangeTotal, order) => {
        exchangeTotal[order.exchange] = exchangeTotal[order.exchange] ?
          exchangeTotal[order.exchange] + order.orderTotal :
          order.orderTotal;
        return exchangeTotal;
      }, {});

      // Tally the total amount of crypto that will be purchased
      reducedOrders.currencyTotal = fulfilledOrderBook.reduce(
        (currencyTotal, order) => {
          return currencyTotal + order.amount;
        }, 0);

      // res.send(fulfilledOrderBook);
      res.send(reducedOrders);
  });
});

module.exports = router;
