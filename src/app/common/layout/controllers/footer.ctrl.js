(function () {
  'use strict';

  angular
    .module('test.common.layout')
    .controller('test.common.layout.footer.ctrl', Controller);

  /** @ngInject */
  function Controller(
    $scope,
    $window,
    kbCommonTranslateSvc
  ) {

    this.isUserLogged = function() {
      return false;
    };

    this.switchLang = function(value) {
      kbCommonTranslateSvc.setLang(value);
      $window.location.reload();
    };


    this.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };


  }

})();
