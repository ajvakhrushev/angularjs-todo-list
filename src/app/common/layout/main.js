(function() {
  'use strict';

  angular
    .module('test.common.layout', [])
    .config(Config)
    .run(Run);

  /** @ngInject */
  function Config(
    $stateProvider
  ) {

    $stateProvider
      .state({
        name: '404',
        url: '/404',
        templateUrl: '/app/common/layout/templates/404.html',
        controller: 'test.common.layout.404.ctrl as ctrl'
      });

  }

  /** @ngInject */
  function Run() {

  }

})();
