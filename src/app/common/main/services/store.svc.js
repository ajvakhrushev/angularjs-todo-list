(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('testCommonStoreSvc', Service);

  /** @ngInject */
  function Service(
    KbCommonStoreSvc
  ) {

    this.$get = function () {
      return this;
    };

    return new KbCommonStoreSvc();

  }

})();
