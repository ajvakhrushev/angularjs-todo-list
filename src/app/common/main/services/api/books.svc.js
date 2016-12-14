(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('testCommonApiBooksSvc', Service);

  /** @ngInject */
  function Service(
    ENV,
    testCommonUtilsSvc
  ) {

    this.$get = function () {
        return this;
    };

    this.fetch = function(data, options) {
      var params = Object.assign({
        "limit": 100,
        "offset": 0,
        "order": [],
        "filter": []
      }, data || {});

      return testCommonUtilsSvc.request.post('/books', params, options || {});
    };

    this.get = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return testCommonUtilsSvc.request.get('/books/' + params.id, null, options || {});
    };

    this.create = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return testCommonUtilsSvc.request.post('/books/', params, options || {});
    };

    this.update = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return testCommonUtilsSvc.request.put('/books/' + params.id, params, options || {});
    };

    this.delete = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return testCommonUtilsSvc.request.delete('/books/' + params.id, null, options || {});
    };

    this.getSuggestions = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return testCommonUtilsSvc.request.get('/books/suggestions/' + params.id, null, options || {});
    };

    this.getGenres = function(data, options) {
      return testCommonUtilsSvc.request.get('/genres', data, options || {});
    };

    this.getCategories = function(data, options) {
      return testCommonUtilsSvc.request.get('/categories', data, options || {});
    };

    return this;

  }

})();
