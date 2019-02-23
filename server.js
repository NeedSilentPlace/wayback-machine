const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Inliner = require('inliner');
const index = require('./routes/index');
const Url = require('./models/Urls');
const Page = require('./models/Pages');
const app = express();
const db = require('./config/keys_dev').mongoURI;
const corsOption = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use('/', index);

mongoose
  .connect(db, { useNewUrlParser: true, dbName: 'webHistory' })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

schedule.scheduleJob({ hour: 10, minute: 0, dayOfWeek: 1 }, function(){
  console.log(new Date());
  Url.find({})
    .then(res => {
      const urls = res.map(data => data.value);

      for(let i = 0; i < urls.length; i++) {
        new Inliner(urls[i], function(err, html) {
          if(err) {
            console.log('Error at schedular', err);
          } else {
            const page = new Page({ url: urls[i], html, date: new Date().toISOString() });
            
            page.save()
              .then(res => console.log('update success'))
              .catch(error => console.log('Error at schedular'));
          }
        })
      }
    });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
