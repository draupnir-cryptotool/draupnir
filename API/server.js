require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/usersRouter')
const clientRouter = require('./routes/clientRouter')
const orderRouter = require('./routes/orderRouter')
const messageRouter = require('./routes/messageRouter')
const GraphRouter = require('./routes/graphRouter')
const walletBalanceRouter = require('./routes/walletBalanceRouter')
const liveCoinPricesUsd = require('./routes/liveCoinPricesUsd')

const server = express()

// middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) 

// routes
server.use('/api', usersRouter)
server.use('/api', clientRouter)
server.use('/api', orderRouter)
server.use('/api', messageRouter)
server.use('/api', GraphRouter)
server.use('/api', walletBalanceRouter)
server.use('/api', liveCoinPricesUsd)

server.listen(8000, () => {
  console.log('Server listening on port 8000')
})