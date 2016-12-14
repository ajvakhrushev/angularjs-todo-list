(function () {
  'use strict';

  angular
    .module('test.books')
    .factory('testBooksSvc', Service);

  /** @ngInject */
  function Service(
    
  ) {

    this.$get = function () {
      return this;
    };

    this.mapFilter = function(data) {
      var list = [];

      if(!data) {
        data = {};
      }

      if(data.category) {
        list.push({
          key: 'category',
          category: 'string',
          type: 'equals',
          value: data.category
        });
      }

      if(data.genre) {
        list.push({
          key: 'genre',
          category: 'string',
          type: 'equals',
          value: data.genre
        });
      }

      if(data.search) {
        list.push({
          key: 'title',
          category: 'string',
          type: 'contains',
          value: data.search
        });

        // list.push({
        //   key: 'author',
        //   category: 'string',
        //   type: 'contains',
        //   value: data.search
        // });
      }

      return list;
    };

    return this;

  }

})();
