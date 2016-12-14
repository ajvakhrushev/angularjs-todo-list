(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('testCommonConfigSvc', Service);

  /** @ngInject */
  function Service() {

    this.$get = function () {
      return this;
    };

    this.lang = 'en';

    return this;

  }

})();
