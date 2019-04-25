require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');

const PORT = process.env.PORT || 8081;

const uri = `mongodb+srv://${process.env.MONGOUSERNAME}:${
  process.env.MONGOPASSWORD
}@${process.env.MONGOURL}`;

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/build')));
app.use(cors(corsOption));

mongoose.Promise = Promise;
mongoose.connect(uri, { useNewUrlParser: true });

app.use(indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

module.exports = app;
