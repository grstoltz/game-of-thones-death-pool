const mongoose = require('mongoose');
const Guess = require('./Guess');

const Schema = mongoose.Schema;

const PredictionSchema = new Schema(
  {
    poolId: String,
    ownerName: String,
    predictions: [Guess.schema],
    questionOneResponse: Boolean,
    questionTwoResponse: String,
    questionThreeResponse: String,
    questionOneResult: Boolean,
    questionTwoResult: String,
    questionThreeResult: String
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

PredictionSchema.virtual('score').get(function() {
  return this.predictions.reduce((a, b) => a + (b['score'] || 0), 0);
});

const Prediction = mongoose.model('Prediction', PredictionSchema);

module.exports = Prediction;
