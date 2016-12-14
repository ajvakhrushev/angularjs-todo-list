const fs = require('fs');
const Filter = require('../helpers/filter');
const Sort = require('../helpers/sort');
const utils = require('../helpers/utils');
const sort = new Sort();
const filter = new Filter();

// modules
module.exports = function(app, options) {
  var PATH = options.path || {};

  app.post('/books', function (req, res) {
    var data = utils.fetchData(PATH.fixture + '/books/books.json');

    if(req.body.filter.length > 0) {
      var ids = data.map((next) => {
                      return {
                        id: next.id,
                        search: next.name + ' ' + next.author.name,
                        genre: next.genre.name,
                        category: next.genre.category
                      };
                    })
                    .filter(filter.makeMultiplyFn(req.body.filter))
                    .map((next) => next.id);

      data = data.filter((next) => ids.indexOf(next.id) !== -1);
    }

    if(req.body.order.length > 0) {
      data.sort(sort.makeMultiplyFn(req.body.order));
    }

    return res.json({
      list: data.slice(req.body.offset, req.body.offset + req.body.limit),
      length: data.length
    });
  });

  app.get('/books/:id', function (req, res) {
    var data = utils.fetchData(PATH.fixture + '/books/books.json'),
        response = data.find((next) => next.id === req.params.id);

    res.json(response);
  });

  app.post('/books', function (req, res) {
    var data = fetchData(PATH.fixture + '/books/books.json'),
        item = Object.assign({
          id: utils.generateGUID()
        }, req.body.data);

    data.push(item);

    updateData(PATH.fixture + '/books/books.json', data);

    res.json({
      data: item
    });
  });

  app.put('/books/:id', function (req, res) {
    var data = fetchData(PATH.fixture + '/books/books.json'),
        item = data.find((next) => next.id === req.params.id);

    if(!!item) {
      Object.assign(item, req.body.data);

      updateData(PATH.fixture + '/books/books.json', data);
    }

    res.json({
      data: item
    });
  });

  app.delete('/books/:id', function (req, res) {
    var data = fetchData(PATH.fixture + '/books/books.json'),
        index = data.findIndex((next) => next.id === req.params.id);

    if(index >= 0) {
      data.splice(index, 1);

      updateData(PATH.fixture + '/books/books.json', data);
    }

    res.json({
      data: index >= 0
    });
  });

  app.get('/genres', function (req, res) {
    var data = utils.fetchData(PATH.fixture + '/books/genres.json');

    res.json({
      list: data,
      length: data.length
    });
  });

  app.get('/categories', function (req, res) {
    var data = utils.fetchData(PATH.fixture + '/books/categories.json');

    res.json({
      list: data,
      length: data.length
    });
  });

  

};
