const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jsonMinify = require('node-json-minify');
const Filter = require('./helpers/filter');
const Sort = require('./helpers/sort');
const sort = new Sort();
const filter = new Filter();

// modules
const books = require('./books');


const PATH = (function() {

  var root = path.resolve(__dirname, '../../'),
      src = root + '/src';

  return {
    root: root,
    src: src,
    app: src + '/app',
    assets: src + '/assets',
    fixture: src + '/assets/fixture'
  };

}());

// application server
const app = express();

app.use('/bower_components',  express.static(PATH.root + '/bower_components'));
app.use('/app', express.static(PATH.app));
app.use('/assets', express.static(PATH.assets));

app.get(/^.*$/, function (req, res) {
  res.sendFile(PATH.app + '/index.html');
});

app.listen(3000, function () {
  console.log('App Server running on port 3000');
});

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


api.listen(9000, function () {
  console.log('API Server running on port 9000');
});

// *********************************************************
