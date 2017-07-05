const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let MONGODB_CONNECTED = false;
const noteSchema = new mongoose.Schema({ text: String });
const Notes = mongoose.model('Notes', noteSchema);

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const dbConnStr = process.env.DB_URI;

mongoose.connect(dbConnStr, function(err, db) {
  if (err) {
        console.log('Unable to connect to MongoDB. Logging notes to the server console...');
    } else {
        MONGODB_CONNECTED = true;
        console.log('Connected to DB at ' + dbConnStr);
    }
});

app.post('/notes', (req, res) => {
  if(MONGODB_CONNECTED) {
    Notes.create(req.body, function(err, createResults) {
      res.send(createResults);
    });
  }
  else
    console.log(req.body);
  //res.json([]);
});

app.listen(app.get('port'), () => {
  console.log(`The rottnote NodeJS API server at: localhost:${app.get('port')}`);
});
