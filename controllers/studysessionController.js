const Studysession = require('../models/studysessionModel');

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
