(function () {
  'use strict';

  angular
    .module('test.books.dashboard')
    .controller('test.books.dashboard.index.ctrl', Controller);

  /** @ngInject */
  function Controller(
    $scope,
    testCommonUtilsSvc,
    testCommonApiBooksSvc,
    testCommonStoreSvc,
    testBooksSvc
  ) {
    var vm = this;

    this.handlers = {
      onStoreBranchesItemId: function(id) {
        var prev = kbBranchesCommonStoreSvc.get('branches.map.item'),
            next = vm.getBranchesMapData().find(function(next) {
              return next.id === id;
            }),
            list = [mapMarkerDataFn(next)(next)];

        kbBranchesCommonStoreSvc.set('branches.map.item', next);

        if(prev) {
          list.push(mapMarkerDataFn(next)(prev));
        }

        kbCommonMapReusableSvc.markers.updateLight(list);
      },
    };

    this.getBranchesMapData = kbBranchesCommonStoreSvc.makeGetter('branches.map.data');

    this.setItem = function(id) {
      kbBranchesCommonStoreSvc.set('branches.itemId', id);
    };

    this.fetch = function() {
      var item = kbBranchesCommonStoreSvc.get('branches.item'),
          markers = vm.filterMarkers().map(mapMarkerDataFn(item));

      kbCommonMapReusableSvc.markers.set(markers);
      // kbCommonMapReusableSvc.bounds.set(markers);
    };

    this.init = function() {
      kbBranchesCommonStoreSvc.set('branches.filter', {
        type: ['branch', 'atm', 'cashin'],
        hasCashIn: false,
        hasCurrencyExchange: false
      });

      kbBranchesCommonStoreSvc.set('branches.order', {
        type: 'list',
        range: undefined,
        geolocation: undefined
      });

      kbBranchesCommonStoreSvc.on('branches.itemId', vm.handlers.onStoreBranchesItemId);
      kbBranchesCommonStoreSvc.on('branches.filter', vm.fetch);

      kbCommonApiBranchesSvc.readBranchesMapData().then(function(response) {
        kbBranchesCommonStoreSvc.set('branches.map.data', response.data.data);
        kbBranchesCommonStoreSvc.set('branches.map.item', null);

        vm.fetch();
      });
    };

    $scope.$on('$destroy', function() {
      kbBranchesCommonStoreSvc.off('branches.itemId', vm.handlers.onStoreBranchesItemId);
      kbBranchesCommonStoreSvc.off('branches.filter', vm.fetch);
    });

    this.init();

    return vm;
  }

})();
