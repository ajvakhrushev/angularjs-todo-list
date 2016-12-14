(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('testCommonErrorsSvc', Service);

  /** @ngInject */
  function Service(
    $state
  ) {

    this.$get = function () {
      return this;
    };

    this.processError = function(error) {
      if(!error) {
        return;
      }

      switch (error.errorCode) {

        case 401:

          $state.go('t.common.login');
          break;

        default:
          // handle all errors - display notification about error 
      }
    };

    return this;

  }

})();
