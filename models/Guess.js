const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GuessSchema = new Schema(
  {
    characterId: String,
    characterName: String,
    livesResponse: Boolean,
    wightWalkerResponse: Boolean,
    livesResult: Boolean,
    wightWalkerResult: Boolean
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

GuessSchema.virtual('score').get(function() {
  const {
    livesResponse,
    livesResult,
    wightWalkerResponse,
    wightWalkerResult
  } = this;
  let count = 0;

  if (livesResult === null) {
    return count;
  }
  if (wightWalkerResponse === true && wightWalkerResult === true) {
    return (count = count + 1);
  }
  if ((wightWalkerResponse === true) & (wightWalkerResult === false)) {
    return (count = count - 1);
  }
  if (livesResponse === livesResult) {
    return (count = count + 1);
  }
  return count;
});

const Guess = mongoose.model('Guess', GuessSchema);

module.exports = Guess;
