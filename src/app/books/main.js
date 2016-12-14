(function() {
  'use strict';

  angular
    .module('test.books', [
      'ngCookies',
      'ngSanitize',
      'ngMaterial',

      'test.common'
    ])
    .config(Config)
    .run(Run)
    .controller('test.books.index.ctrl', Controller);

  /** @ngInject */
  function Config(
    $stateProvider
  ) {

    $stateProvider
      .state({
        name: 'books',
        url: '/books',
        templateUrl: '/app/books/templates/index.html',
        controller: 'test.books.dashboard.index.ctrl as ctrl'
      });

  }

  /** @ngInject */
  function Run() {

  }    

  /** @ngInject */
  function Controller() {

  }

})();
