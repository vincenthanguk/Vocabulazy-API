const mongoose = require('mongoose');
const { Schema } = mongoose;

const passportLocalMongoose = require('passport-local-mongoose');

const Session = new Schema({
  refreshToken: {
    type: String,
    default: '',
  },
});

const User = new Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    studySessions: {
      type: Number,
      default: 0,
    },
    authStrategy: {
      type: String,
      default: 'local',
    },
    refreshToken: {
      type: [Session],
    },
  },
  { timestamps: true }
);

//Remove refreshToken from the response
User.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
