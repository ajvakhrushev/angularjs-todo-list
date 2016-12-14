(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('testCommonApiBooksSvc', Service);

  /** @ngInject */
  function Service(
    ENV,
    kbCommonUtilsSvc
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

      return kbCommonUtilsSvc.request.post('/books', params, options || {});
    };

    this.get = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return kbCommonUtilsSvc.request.get('/books/' + params.id, null, options || {});
    };

    this.create = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return kbCommonUtilsSvc.request.post('/books/', params, options || {});
    };

    this.update = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return kbCommonUtilsSvc.request.put('/books/' + params.id, params, options || {});
    };

    this.delete = function(data, options) {
      var params = Object.assign({
        "id": null
      }, data || {});

      return kbCommonUtilsSvc.request.delete('/books/' + params.id, null, options || {});
    };

    return this;

  }

})();
