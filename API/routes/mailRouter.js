const express = require('express');

const router = express.Router();

router.post('/mail', (req, res) => {
  const apiKey = process.env.MAILGUN_API;
  const domain = 'sandboxf47c6cc2f65a472b97244e383b08d3b8.mailgun.org';
  const mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

  // Turns the base64 encoded pdf into a mailgun attachment
  let buf = new Buffer(req.body.file, 'base64');
  let mailgunAttach = new mailgun.Attachment({data: buf, filename: 'C&BQuote.pdf'});

  let data = {
    from: 'Caleb & Brown <postmaster@sandboxf47c6cc2f65a472b97244e383b08d3b8.mailgun.org>',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    attachment: mailgunAttach,
  };
  mailgun.messages().send(data, function(error, body) {
    // console.log(body);
  });
});

module.exports = router;

