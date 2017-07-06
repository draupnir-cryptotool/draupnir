const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');

const app = express();

app.use(bodyParser.json());

// Automagically puts '/api' at the front of all api urls.
app.use('/api', routes);

app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000, function() {
  console.log('Now listening for requests...');
});

