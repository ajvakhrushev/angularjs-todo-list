(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('testCommonStoreSvc', Service);

  /** @ngInject */
  function Service(
    TestCommonStoreSvc
  ) {

    this.$get = function () {
      return this;
    };

    return new TestCommonStoreSvc();

  }

})();
