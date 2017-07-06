require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRouter');
const clientRouter = require('./routes/clientRouter');
const orderRouter = require('./routes/orderRouter');
const messageRouter = require('./routes/messageRouter');
const GraphRouter = require('./routes/graphRouter');

const server = express();

// middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// routes
server.use(usersRouter);
server.use(clientRouter);
server.use(orderRouter);
server.use(messageRouter);
server.use(GraphRouter);

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
