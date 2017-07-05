require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/usersRouter')
const clientRouter = require('./routes/clientRouter')
const orderRouter = require('./routes/orderRouter')
const messageRouter = require('./routes/messageRouter')
const GraphRouter = require('./routes/graphRouter')
require('dotenv')

const server = express()

// middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) 

// sets up the dotenv file for secret variables.
require('dotenv').config({ path: '.env' });

// routes
server.use(usersRouter)
server.use(clientRouter)
server.use(orderRouter)
server.use(messageRouter)
server.use(GraphRouter)


server.listen(3000, () => {
  console.log('Server listening on port 3000')
})