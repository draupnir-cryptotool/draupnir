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
const order = require('./routes/order.js');
const authMiddlware = require('./middleware/auth');
const authRouter = require('./routes/auth');
const cors = require('cors');

const server = express();

// middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) 

// CORS
server.use(cors({
  origin: process.env.CORS_ORIGINS
}))

// Connect passport to express
server.use(authMiddlware.initialize)

// routes
server.use(authRouter)
server.use('/api', [
  usersRouter,
  clientRouter,
  orderRouter,
  messageRouter,
  GraphRouter,
  walletBalanceRouter,
  liveCoinPricesRouter,
  order,
])

// Handle errors by returning JSON
server.use((error, req, res, next) => {
  const status = error.status || 500
  res.status(status).json({
    error: { message: error.message }
  })
})


server.listen(8000, () => {
  console.log('Server listening on port 8000')
})
