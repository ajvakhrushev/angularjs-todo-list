(function() {
  'use strict';

  angular
    .module('test.common', [
      'ngCookies',
      'ngSanitize',
      'ngMaterial',

      'test.common.layout'
    ])
    .config(Config)
    .run(Run)
    .controller('test.common.index.ctrl', Controller);

  /** @ngInject */
  function Config(
    $stateProvider
  ) {

    $stateProvider
      .state({
        abstract: true,
        name: 'test',
        views: {
          header: {
            templateUrl: '/app/common/layout/templates/header.html',
            controller: 'test.common.layout.header.ctrl as ctrl'
          },
          footer: {
            templateUrl: '/app/common/layout/templates/footer.html',
            controller: 'test.common.layout.footer.ctrl as ctrl'
          },
          content: {
            templateUrl: '/app/common/layout/templates/content.html',
            controller: 'test.common.layout.content.ctrl as ctrl'
          }
        }
      });

  }

  /** @ngInject */
  function Run() {

  }    

  /** @ngInject */
  function Controller() {

  }

})();
