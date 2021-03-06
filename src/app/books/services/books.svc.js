(function () {
  'use strict';

  angular
    .module('test.books')
    .factory('testBooksSvc', Service);

  /** @ngInject */
  function Service(
    $filter
  ) {

    var filterDate = $filter('date');

    this.$get = function () {
      return this;
    };

    this.mapData = function(next) {
      next.display = {
        published: filterDate(next.published, 'dd.MM.yyyy')
      };

      return next;
    };

    this.mapFilter = function(data) {
      var list = [];

      if(!data) {
        data = {};
      }

      list.push({
        key: 'category',
        category: 'string',
        type: 'equals',
        value: data.category ? data.category.toLowerCase() : undefined
      });

      list.push({
        key: 'genre',
        category: 'string',
        type: 'equals',
        value: data.genre ? data.genre.toLowerCase() : undefined
      });

      list.push({
        key: 'search',
        category: 'string',
        type: 'contains',
        value: data.search ? data.search.toLowerCase() : undefined
      });

      return list;
    };

    return this;

  }

})();
