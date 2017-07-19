const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

router.get('/pdfquote', (req, res) => {
  console.log(req.query);

  let data = {
    client: 'Testy McTestface',
    quoteId: 123,
    orderAmount: 10000,
    currency: 'Bitcoin',
    exchange1: {
      name: 'ACX',
      bestPrice: 2500,
    },
    exchange2: {
      name: 'BTC Markets',
      bestPrice: 2600,
    },
    average: 0,
    spotPrice: 2520,
    commission: 0.04,
    totalPerCoin: 2700,
    totalCoins: 4.2,
  };

  data.average = (data.exchange1.bestPrice + data.exchange2.bestPrice) / 2;
  data.totalPerCoin = data.spotPrice * data.commission;
  data.totalCoins = data.orderAmount / data.totalPerCoin;

  const doc = new PDFDocument();
  // let filename = req.body.filename;
  // Stripping special characters
  // filename = encodeURIComponent(filename) + '.pdf';
  let filename = 'pdfQuote.pdf';
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition',
                'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');
  // const content = req.query.exchange1;
  doc.y = 300;
  doc.text('Caleb & Brown', 50, 50);
  doc.text(data.client);
  doc.text(data.quoteId);
  doc.text(data.orderAmount);
  doc.text(data.currency);
  doc.text(data.exchange1.name);
  doc.text(data.exchange1.bestPrice);
  doc.text(data.exchange2.name);
  doc.text(data.exchange2.bestPrice);
  doc.pipe(res);
  doc.end();
});

module.exports = router;
