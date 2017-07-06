const express = require('express');
const GraphData = require('../models/GraphData');
const router = express.Router();

// receive graph data to render
router.get('/graph/askprice', (req, res) => {
  const askPriceGraphData = GraphData.find()
  .then((data) => {
    res.json(askPriceGraphData);
  })
  .catch((err) => {
    resp.json({err: 'Just keep fucking up dont ya?'});
  });
});

module.exports = router;
