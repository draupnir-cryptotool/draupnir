// Handle routes
const express = require('express');
const router = express.Router();
// Handle API requests
const fetch = require('node-fetch');
// Adds functions for working with arrays etc.
const _ = require('lodash');

// Temporary route for testing
router.get('/:currencyToBuy/:tallyCurrency/:amount', function(req, res, next) {
  // Create a fetch promise for each API call.
  // These will all be called by a Promise.all later
  const fetchBitfinex = fetch(`https://api.bitfinex.com/v1/book/${req.params.currencyToBuy}usd/?limit_bids=0`)
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
      // Bitstamp, in their infinite wisdom, don't sell ETH, so we don't return
      // anything unless it is a BTC trade
      if (req.params.currencyToBuy != 'btc') {
        return;
      };
      return massagedOrderBook;
    });

  const fetchBTCe = fetch(`https://btc-e.com/api/3/depth/${req.params.currencyToBuy}_usd/?limit=5000`)
    .then((res) => res.json())
    .then((json) => {
      orderBook = json[`${req.params.currencyToBuy}_usd`].asks;
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

      // Iterate through the complete order book.
      // 'for...of' lets us 'break' out of the loop, 'forEach' wouldn't
      for (let order of fullOrderBook) {
        // If we have hit our requested order amount, or done over slightly,
        // we are good to go
        if (orderTally >= orderAmount) {
          break;

          // If the order in the book is less than the requested amount,
          // grab the whole order and move onto the next one
        } else if (order.orderTotal < (orderAmount - orderTally)) {
          // Check if the order amount is measured in fiat or cryto and
          // tally accordingly
          req.params.tallyCurrency === 'usd'
            ? orderTally += order.orderTotal
            : req.params.tallyCurrency === 'btc'
              || req.params.tallyCurrency === 'eth'
              ? orderTally += order.amount
              : ''; // THROW ERROR

          fulfilledOrderBook.push(order);

          // Order is more than what we need to fulfil requested amount,
          // we only need part of it
        } else {
          partialOrder = order;
          req.params.tallyCurrency === 'usd'
            ? partialOrder.amount = (
              orderAmount - orderTally
            ) / partialOrder.price
            : req.params.tallyCurrency === 'btc'
              || req.params.tallyCurrency === 'eth'
              ? partialOrder.amount = orderAmount - orderTally
              : ''; // THROW ERROR
          partialOrder.orderTotal = partialOrder.price * partialOrder.amount;
          req.params.tallyCurrency === 'usd'
            ? orderTally += order.orderTotal
            : req.params.tallyCurrency === 'btc'
              || req.params.tallyCurrency === 'eth'
              ? orderTally += order.amount
              : ''; // THROW ERROR
          fulfilledOrderBook.push(partialOrder);
        }
      };

      // Tally the total order amount for each exchange
      reducedOrders = fulfilledOrderBook.reduce((exchangeTotal, order) => {
        exchangeTotal[order.exchange] = exchangeTotal[order.exchange]
          ? exchangeTotal[order.exchange] + order.orderTotal
          : order.orderTotal;
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
