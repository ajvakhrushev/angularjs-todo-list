(function() {
  'use strict';

  angular
    .module('test', [
      'ngCookies',
      'ngSanitize',
      'ui.router',
      'ngMaterial',

      'test.common',
      'kb.books'
    ])
    .config(Config)
    .run(Run)
    .controller('test.index.ctrl', Controller);

  /** @ngInject */
  function Config(
    $httpProvider,
    $locationProvider,
    $urlRouterProvider,
    $mdThemingProvider
  ) {

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

        kbCommonErrorsSvc.processError(info);

        return $q.reject(response);
      }
    };

  }

})();
