(function () {
  'use strict';

  angular
    .module('test.books')
    .controller('test.books.item.ctrl', Controller);

  /** @ngInject */
  function Controller(
    $scope,
    $state,
    testCommonUtilsSvc,
    testCommonApiBooksSvc,
    testCommonStoreSvc,
    testBooksSvc
  ) {
    var vm = this;

    this.handlers = {
      onStoreBooksItem: function(data) {
        vm.item = data;
      },
      onStoreBooksItemSuggestions: function(data) {
        vm.list = data;
      }
    };

    this.goToItem = function(value) {
      if(value) {
        $state.go('book', {id: value});
      }
    };

    this.getSuggestions = function(value) {
      testCommonApiBooksSvc.getSuggestions({id: value}).then(function(response) {
        var data = response.data.list.map(testBooksSvc.mapData);

        testCommonStoreSvc.set('books.itemSuggestions', data);
      });
    };

    this.fetch = function(value) {
      testCommonApiBooksSvc.get({id: value}).then(function(response) {
        var data = testBooksSvc.mapData(response.data);

        testCommonStoreSvc.set('books.item', data);
      });
    }

    this.init = function() {
      testCommonStoreSvc.on('books.item', vm.handlers.onStoreBooksItem);
      testCommonStoreSvc.on('books.itemSuggestions', vm.handlers.onStoreBooksItemSuggestions);

      vm.fetch($state.params.id);
      vm.getSuggestions($state.params.id);
    };

    $scope.$on('$destroy', function() {
      testCommonStoreSvc.off('books.item', vm.handlers.onStoreBooksItem);
      testCommonStoreSvc.off('books.itemSuggestions', vm.handlers.onStoreBooksItemSuggestions);
    });

    this.init();

    return vm;
  }

})();
