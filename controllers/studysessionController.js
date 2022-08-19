const Studysession = require('../models/studysessionModel');

exports.getAllStudysessions = async (req, res) => {
  try {
    const studysessions = await Studysession.find({
      user: req.user.id,
    });

    console.log('params: ', req.user.id, studysessions);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: studysessions.length,
      data: {
        studysessions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createStudysession = async (req, res) => {
  try {
    const newStudysession = await Studysession.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        deck: newStudysession,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
