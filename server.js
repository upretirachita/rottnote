const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/notes', (req, res) => {
  console.log(req.body);
  res.json([]);
});

app.listen(app.get('port'), () => {
  console.log(`The rottnote NodeJS API server at: localhost:${app.get('port')}`); // eslint-disable-line no-console
});
