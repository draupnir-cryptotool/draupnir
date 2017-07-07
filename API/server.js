require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRouter');
const clientRouter = require('./routes/clientRouter');
const orderRouter = require('./routes/orderRouter');
const messageRouter = require('./routes/messageRouter');
const GraphRouter = require('./routes/graphRouter');
const walletBalanceRouter = require('./routes/walletBalanceRouter');
const liveCoinPrices = require('./routes/liveCoinPrices');
const api = require('./routes/api.js');

const server = express();

// middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) 

// routes
server.use('/api', [
  usersRouter,
  clientRouter,
  orderRouter,
  messageRouter,
  GraphRouter,
  walletBalanceRouter,
  liveCoinPrices
])

server.listen(8000, () => {
  console.log('Server listening on port 8000')
})
