(function() {
  'use strict';

  angular
    .module('test', [
      'ngCookies',
      'ngSanitize',
      'ui.router',
      'ngMaterial',

      'test.common',
      'test.books'
    ])
    .config(Config)
    .run(Run)
    .controller('test.index.ctrl', Controller);

  /** @ngInject */
  function Config(
    $httpProvider,
    $locationProvider,
    $urlRouterProvider
  ) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/404');

    Object.assign($httpProvider.defaults.headers.common, {
      "Accept": 'application/json, text/javascript',
      "Content-Type": 'application/json; charset=utf-8',
      "useXDomain": true
    });

    $httpProvider.interceptors.push($httpIntercept);

  }

  /** @ngInject */
  function Run(
    $rootScope,
    $filter,
    $http,
    $mdDateLocale
  ) {

    var filterDate = $filter('date');

    $mdDateLocale.formatDate = function(date) {
      return date ? filterDate(date, 'DD.MM.YYYY') : '';
    };
  }

  /** @ngInject */
  function Controller() {

  }

  /** @ngInject */
  function $httpIntercept(
    $q,
    testCommonErrorsSvc
  ) {

    return {
      responseError: function(response) {
        var info = response && response.data && response.data.error ? response.data.error : response;

        testCommonErrorsSvc.processError(info);

        return $q.reject(response);
      }
    };

  }

})();
