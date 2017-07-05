require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv')

const server = express()

// sets up the dotenv file for secret variables.
require('dotenv').config({ path: '.env' });

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) 

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})