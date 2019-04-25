const router = require('express').Router();
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.csv');

const db = require('../models');

router.post('/api/populate', async (req, res) => {
  const characterStatus = cellData => {
    if (cellData.includes('Becomes a Wight')) {
      return false;
    }
    if (cellData.includes('Lives')) {
      return true;
    }

    if (cellData.includes('Dies')) {
      return false;
    }

    return false;
  };

  const wightWalkerStatus = cellData => {
    if (cellData.includes('Becomes a Wight')) {
      return true;
    }
    return null;
  };

  const populate = results => {
    db.Prediction.insertMany(results)
      .then(result => res.send(result))
      .catch(err => res.status(422).json(err));
  };

  function parse() {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => {
        const processedArr = results.map(e => {
          const arr = Object.keys(e).map(function(key) {
            const obj = {
              [key]: e[key].replace(';', ' , ')
            };
            return obj;
          });

          return arr;
        });

        const databaseArr = processedArr.map(array => {
          const slicedArr = array.slice(2, 34);
          const characterGuessArray = slicedArr.map((element, index) => {
            const guess = {
              characterId: index,
              characterName: Object.keys(element)[0].toString(),
              livesResponse: characterStatus(Object.values(element)[0]),
              wightWalkerResponse: wightWalkerStatus(Object.values(element)[0]),
              livesResult: null,
              wightWalkerResult: null,
              score: 0
            };
            return guess;
          });

          const predictionData = {
            poolId: process.env.POOLID,
            ownerName: Object.values(array[1])[0],
            predictions: characterGuessArray,
            questionOneResponse:
              Object.values(array[35])[0] === 'Yes' ? true : false,
            questionTwoResponse: Object.values(array[36])[0],
            questionThreeResponse: Object.values(array[37])[0],
            questionOneResult: null,
            questionTwoResult: null,
            questionThreeResult: null,
            score: 0
          };
          return predictionData;
        });
        populate(databaseArr);
      });
  }
  parse();
});

router.get('/api/user/:id', (req, res) => {
  db.Prediction.find({
    _id: req.params.id
  })
    .then(result => res.send(result))
    .catch(err => res.status(422).json(err));
});

router.get('/api/pool/:id', (req, res) => {
  db.Prediction.find({
    poolId: req.params.id
  })
    .then(result => res.send(result))
    .catch(err => res.status(422).json(err));
});

router.post('/api/character/death/:id', (req, res) => {
  db.Prediction.updateMany(
    { 'predictions.characterId': req.params.id },
    { $set: { 'predictions.$.livesResult': false } }
  )
    .then(result => res.send(result))
    .catch(err => res.status(422).json(err));
});

router.post('/api/character/wight/:id', (req, res) => {
  db.Prediction.updateMany(
    { 'predictions.characterId': req.params.id },
    { $set: { 'predictions.$.wightWalkerResult': false } }
  )
    .then(result => res.send(result))
    .catch(err => res.status(422).json(err));
});
module.exports = router;
