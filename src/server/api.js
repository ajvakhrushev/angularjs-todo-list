const express = require('express');
const bodyParser = require('body-parser');
const PATH = require('./config');
const Filter = require('./helpers/filter');
const Sort = require('./helpers/sort');
const sort = new Sort();
const filter = new Filter();

// modules
const books = require('./books');

const PORT = process.env.PORT || 9000;

// api server
const api = express();

api.use(bodyParser.json());

api.use(( req, res, next ) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, useXDomain');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Accept', 'application/json');
  res.header('Content-Type', 'application/json');

  next();
});


books(api, {path: PATH});


api.listen(PORT, function () {
  console.log('API Server running on port ' + PORT);
});
