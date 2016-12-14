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

    return this;

  }

})();
