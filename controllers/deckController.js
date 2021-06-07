const fs = require('fs');

const decks = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/decks.json`)
);

exports.getAllDecks = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: decks.length,
    data: {
      decks: decks,
    },
  });
};

exports.getDeck = (req, res) => {
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
};

exports.createDeck = (req, res) => {
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
};

exports.updateDeck = (req, res) => {
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
};

exports.deleteDeck = (req, res) => {
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
};
