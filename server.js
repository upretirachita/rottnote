const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let MONGODB_CONNECTED = false;
const noteSchema = new mongoose.Schema({
  userEmail: String,
  notes: {
    type: Array
  } });
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
  console.log(req.body);
  if(MONGODB_CONNECTED) {
    console.log("adding note");
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Notes.findOneAndUpdate({userEmail: req.body.userEmail}, req.body, options, function(err, createResults) {
      if(err) {
        console.log(err);
      }
      res.send(createResults);
    });
  }
  else
    console.log(req.body);
  //res.json([]);
});

app.get('/notes/:email', (req, res) => {
  let data;
  if (MONGODB_CONNECTED) {
    Notes.findOne({userEmail: req.params.email}, "notes", function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result !== null) {
        data = result;
      } else {
        data = [];
      }
      res.send(JSON.stringify(data));
    });
  }
  else
      res.json([]);
});

app.listen(app.get('port'), () => {
  console.log(`The rottnote NodeJS API server at: localhost:${app.get('port')}`);
});
