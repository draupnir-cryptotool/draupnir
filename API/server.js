require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) 

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})