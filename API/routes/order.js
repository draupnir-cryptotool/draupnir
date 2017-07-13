// Handle routes
const express = require('express');
const router = express.Router();
// Handle API requests
const fetch = require('node-fetch');
// Adds functions for working with arrays etc.
const _ = require('lodash');

// Route for generating orders
// Example API call:
// http://localhost:8000/api/order?buying=btc&tally=usd&amount=20000&btceLimit=5000&bitstampLimit=5000&bitfinexLimit=5000
router.get('/order', function(req, res, next) {
  // Grab everything in the query string
  qs = req.query;
  // Create a fetch promise for each API call. These will all be called by a
  // Promise.all later
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
      // Promise.all gives us an array of the returned values, so we flatten
      // them into a single array
      fullOrderBook = _.flattenDeep(orderBooks);
      // We now have a single array of objects, so we sort them by their price
      // property
      fullOrderBook = _.sortBy(fullOrderBook, ['price']);

      // Pull the individual exchange limits out of the query string so that its
      // easier to check them below.
      const limits = {
        btce: qs.btceLimit,
        bitstamp: qs.bitstampLimit,
        bitfinex: qs.bitfinexLimit,
      };

      // This is where will will put all the orders we want to buy, up to the
      // amount requested
      let orderData = {
        totalUsdSpent: 0,
        totalAudSpent: 0,
        totalCoinBought: 0,
        exchanges: {
          bitfinex: {
            usdSpent: 0,
            audSpent: 0,
            coinBought: 0,
          },
          bitstamp: {
            usdSpent: 0,
            audSpent: 0,
            coinBought: 0,
          },
          btce: {
            usdSpent: 0,
            audSpent: 0,
            coinBought: 0,
          },
        },
        orders: [],
      };

      // This is where we will keep a tally of all the money spent over
      // each exchange, so we can check limits.
      let tally = 0;

      // Iterate through the complete order book. 'for...of' lets us 'break' out
      // of the loop, 'forEach' wouldn't
      for (let order of fullOrderBook) {
        // If we have hit our requested order amount, or gone over slightly, we
        // can stop looking at orders
        if (tally >= qs.amount) {
          break;
        }

        // Work out how much is left to order in total and also from this
        // particular exchange
        let totalRemaining = qs.amount - tally;
        let exchangeRemaining = limits[order.exchange] - orderData.exchanges[order.exchange].usdSpent;

        // Check if the exchange this order is from is over its limit and jump
        // to the next order if it is.
        if (exchangeRemaining <= 0) {
          continue;
        }

        // Tallying by USD, not coins
        if (qs.tally == 'usd') {
          // Check if the limit remaining on the exchange is equal or larger than
          // the total order amount remaining. Otherwise, the maximum we can take
          // from this order will be the exchange limit amount remaining.
          if (exchangeRemaining < totalRemaining) {
            totalRemaining = exchangeRemaining;
          }
          // Order is more than what we need to fulfil requested amount, we only
          // need part of it
          if (order.orderTotal > totalRemaining) {
            let partialOrder = order;
            partialOrder.amount = totalRemaining / partialOrder.price;
            // Set the total price of the order based on adjusted amount
            partialOrder.orderTotal = partialOrder.price * partialOrder.amount;
            tally += partialOrder.orderTotal;

            // Update exchange limit remaining. This is always tallied in usd.
            orderData.exchanges[order.exchange].usdSpent += partialOrder.orderTotal;
            orderData.exchanges[order.exchange].coinBought += partialOrder.amount;
            orderData.totalUsdSpent += partialOrder.orderTotal;
            orderData.totalCoinBought += partialOrder.amount;

            orderData.orders.push(partialOrder);

          // If the order in the book is less than the requested amount, grab
          // the whole order and move onto the next one
          } else {
            // Check if the order amount is measured in fiat or crypto and tally
            // accordingly
            tally += order.orderTotal;

            // Update exchange limit remaining. This is always tallied in usd.
            orderData.exchanges[order.exchange].usdSpent += order.orderTotal;
            orderData.exchanges[order.exchange].coinBought += order.amount;
            orderData.totalUsdSpent += order.orderTotal;
            orderData.totalCoinBought += order.amount;

            orderData.orders.push(order);
          }

        // Not tallying by USD, so must be tallying by coins
        } else {
          // The amount we can buy from this order is potentially limited by the
          // float remaining on the exchange. Using Math.min() we can find the
          // smallest number out of this order's total value and the exchange's
          // remaining float
          let maxAvailiable = Math.min(exchangeRemaining, order.orderTotal);

          // We have a certain amount of coins we are looking for. We need to
          // know how much that would cost if we bought them all from this
          // order. This will let us work out if we can afford to buy them from
          // this order on this exchange.
          let remainingValue = totalRemaining * order.price;

          if (remainingValue > maxAvailiable) {
            // Take partial amount
            let partialOrder = order;
            partialOrder.amount = remainingValue / partialOrder.price;
            partialOrder.orderTotal = partialOrder.price * partialOrder.amount;
            tally += partialOrder.amount;

            orderData.exchanges[order.exchange].usdSpent += partialOrder.orderTotal;
            orderData.exchanges[order.exchange].coinBought += partialOrder.amount;
            orderData.totalUsdSpent += partialOrder.orderTotal;
            orderData.totalCoinBought += partialOrder.amount;

            orderData.orders.push(partialOrder);
          } else if (remainingValue <= maxAvailiable) {
            // take whole maxAvailiable from this oder
            tally += order.amount;

            orderData.exchanges[order.exchange].usdSpent += order.orderTotal;
            orderData.exchanges[order.exchange].coinBought += order.amount;
            orderData.totalUsdSpent += order.orderTotal;
            orderData.totalCoinBought += order.amount;

            orderData.orders.push(order);
          }
          console.log(tally);
        }
      }
      fetch('http://localhost:8000/api/forexrates')
        .then((res) => res.json())
        .then((rates) => {
          orderData.totalAudSpent = orderData.totalUsdSpent * rates.usdToAud;
          Object.keys(orderData.exchanges).forEach((exchange) => {
            orderData.exchanges[exchange].audSpent = orderData.exchanges[exchange].usdSpent * rates.usdToAud;
          });
          res.send(orderData);
        })
        .catch((err) => {
          console.log(err);
        });
    });
});
module.exports = router;
