const express = require('express')

const router = express.Router()

router.post('/mail', (req,res) => {
  var api_key = 'key-7a457251a10823bdef5a0b4bae356169';
  var domain = 'sandboxf47c6cc2f65a472b97244e383b08d3b8.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  
  var data = {
    from: 'Excited User <postmaster@sandboxf47c6cc2f65a472b97244e383b08d3b8.mailgun.org>',
    to: 'viginatarajan@gmail.com',
    subject: req.body.subject,
    text: req.body.text
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
})

module.exports = router

