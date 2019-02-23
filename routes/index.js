const express = require('express');
const Inliner = require('inliner');
const Page = require('../models/Pages');
const Url = require('../models/Urls');
const router = express.Router();

router.get('/archive/:url', function(req, res) {
  const url = req.params.url;
  
  Page.find({ url }).then(function(response) {
    if(response.length) {
      const dates = response.map(data => data.date);
      
      res.json({ dates });
    } else {
      Url.find({}).then(function(response) {
        const similarDocuments = response.filter(data => url.indexOf(data.value) !== -1 || data.value.indexOf(url) !== -1);
        const similarUrls = similarDocuments.map(document => document.value);

        res.json({ similarUrls });
      });
    }
  });
});

router.get('/archive/:url/:date', function(req, res) {
  const { url, date } = req.params;

  Page.find({ url, date}).then(response => {
    const html = response[0].html;

    res.json({ html });
  });
});

router.post('/archive', function(req, res) {
  const url = req.body.url;

  new Inliner(url, function(err, html) {
    if(err) {
      console.log('Error at archive request', err);
      res.json({ error: 'URL condition is chaged, cannot archive'});
    } else {
      const page = new Page({ url, html, date: new Date().toISOString() });

      page.save()
        .then(result => {
          res.json({ message: 'Success to archive!' });
        })
        .catch(error => {
          console.log('Error at archive database save', error);
          res.json({ error: 'URL is not available to archive' });
        })
    }
  });
});


router.post('/archive/first', function(req, res) {
  const url = req.body.url;

  new Inliner(url, (err, html) => {
    if(err) {
      console.log('Error at first archive request', err);
      res.json({ error: 'URL is not available to archive'});
    } else {
      const page = new Page({ url, html, date: new Date().toISOString() });

      page.save()
        .then(result => {
          const newUrl = new Url({ value: url });

          newUrl.save()
            .then(response => {
              res.json({ message: 'Success to archive!' });
            })
            .catch(error => {
              console.log('Error at first archive database save', error);
              res.json({ error: 'URL is not available to archive' });
            });
        })
        .catch(error => {
          res.json({ error: 'URL is not available to archive' });
        });
    }
  });
});

module.exports = router;
