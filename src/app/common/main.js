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
  function Config() {

  }

  /** @ngInject */
  function Run() {

  }    

  /** @ngInject */
  function Controller() {

  }

})();
