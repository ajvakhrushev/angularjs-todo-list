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

var data = {
  stable: fetchData(),
  cache: null
};

var request = {
  filter: [],
  order: [],
  limit: 0,
  set: function(data) {
    this.filter = data.filter || [];
    this.order = data.order || [];
    this.limit = data.limit || 0;
  },
  isChanged: (function() {

    const makeOnSomeChanges = (next) => (entity) => next.key === entity.key && next.value === entity.value && next.type === entity.type;
    const makeOnSomeRemoving = (next) => (entity) => next.key === entity.key;

    return function(data) {
      return  (data.limit !== this.limit) ||
              !(data.filter.every((next) => this.filter.some(makeOnSomeChanges(next))) && this.filter.every((next) => data.filter.some(makeOnSomeRemoving(next)))) ||
              !(data.order.every((next) => this.order.some(makeOnSomeChanges(next))) && this.order.every((next) => data.order.some(makeOnSomeRemoving(next))));
    };

  }())
};

function fetchData() {
  return [];
  // test for 1 000 000 entities
  // var data1 = JSON.parse(fs.readFileSync(PATH.fixture + '/clients.1.min.json', 'utf8'));
  // var data2 = JSON.parse(fs.readFileSync(PATH.fixture + '/clients.2.min.json', 'utf8'));
  // var data = data1.concat(data2);
  // test for 100 000 entities
  var data = JSON.parse(fs.readFileSync(PATH.fixture + '/clients.min.json', 'utf8'));

  return data;
}

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


api.post('/list', function (req, res) {
  if(!!request.isChanged(req.body)) {
    data.cache = data.stable.slice();
    request.set(req.body);

    if(req.body.filter.length > 0) {
      data.cache = data.cache.filter(filter.makeMultiplyFn(req.body.filter));
    }

    if(req.body.order.length > 0) {
      data.cache.sort(sort.makeMultiplyFn(req.body.order));
    }
  }

  return res.json({
    list: data.cache.slice(req.body.offset, req.body.offset + req.body.limit),
    length: data.cache.length
  });
});

api.get('/list/:id', function (req, res) {
  var data = fetchData(),
      response = data.find((next) => next.id === req.params.id);

  res.json(response);
});


branches(api, {path: PATH});
currencies(api, {path: PATH});
products(api, {path: PATH});


api.listen(9000, function () {
  console.log('API Server running on port 9000');
});

// *********************************************************
