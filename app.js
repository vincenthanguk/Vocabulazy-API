const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

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

app.get('/api/v1/decks/:id', (req, res) => {
  //   find element that has id equal to req.params
  //   convert string to number with * 1
  const id = req.params.id * 1;

  if (id > decks.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  const deck = decks.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      deck,
    },
  });
});

app.post('/api/v1/decks', (req, res) => {
  const newId = decks[decks.length - 1].id + 1;
  const newDeck = Object.assign({ id: newId }, req.body);

  decks.push(newDeck);

  fs.writeFile(
    `${__dirname}/dev-data/data/decks.json`,
    JSON.stringify(decks),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          decks: newDeck,
        },
      });
    }
  );
});

app.patch('/api/v1/decks/:id', (req, res) => {
  if (req.params.id * 1 > decks.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      decks: '<updated decks here>',
    },
  });
});

app.delete('/api/v1/decks/:id', (req, res) => {
  if (req.params.id * 1 > decks.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
