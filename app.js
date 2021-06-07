const fs = require('fs');
const express = require('express');

const app = express();

const decks = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/decks.json`)
);

app.get('/api/v1/decks', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: decks.length,
    data: {
      decks: decks,
    },
  });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
