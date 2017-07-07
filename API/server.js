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
const liveCoinPricesRouter = require('./routes/liveCoinPricesRouter');
const api = require('./routes/api.js');
const authMiddlware = require('./middleware/auth')

const server = express();

// middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) 

// Connect passport to express
server.use(authMiddlware.initialize)

// routes
server.use('/api', [
  usersRouter,
  clientRouter,
  orderRouter,
  messageRouter,
  GraphRouter,
  walletBalanceRouter,
  liveCoinPricesRouter
])

server.listen(8000, () => {
  console.log('Server listening on port 8000')
})
