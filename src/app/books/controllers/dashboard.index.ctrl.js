(function () {
  'use strict';

  angular
    .module('test.books')
    .controller('test.books.dashboard.index.ctrl', Controller);

  /** @ngInject */
  function Controller(
    $scope,
    $filter,
    testCommonUtilsSvc,
    testCommonApiBooksSvc,
    TestCommonModelSvc,
    testCommonStoreSvc,
    testBooksSvc
  ) {
    var vm = this,
        filterDate = $filter('date'),
        _default = {
          filter: {
            category: null,
            genre: null,
            search: null
          }
        };

    this.handlers = {
      onStoreBooksModelList: function(data) {
        vm.list = testCommonStoreSvc.get('books.model').list;
      }
    };

    this.filter = {
      data: _default.filter,
      onChange: function() {
        testCommonStoreSvc.set('books.filter', vm.filter.data);
      }
    };

    this.fetch = function() {
      var model = testCommonStoreSvc.get('books.model');

      model.fetch({
        offset: 0,
        filter: testBooksSvc.mapFilter(vm.filter.data)
      });
    };

    this.loadMore = function() {
      var model = testCommonStoreSvc.get('books.model');

      return model.fetch({
        offset: model.offset + model.limit,
        filter: testBooksSvc.mapFilter(vm.filter.data)
      });
    };

    this.init = function() {
      testCommonStoreSvc.set('books.model', new TestCommonModelSvc({
        limit: 20,
        rest: {
          fetch: function(data, options) {
            return testCommonApiBooksSvc.fetch(data, options).then(function(response) {
              var data = {
                list: [],
                length: 0
              };

              if(response.data) {
                data.list = response.data.list.map(function(next) {
                  next.display = {
                    published: filterDate(next.published, 'dd.MM.yyyy')
                  };

                  return next;
                });
                data.length = response.data.length;
              }

              return data;
            });
          }
        }
      }));

      testCommonStoreSvc.get('books.model').on('list:changed', vm.handlers.onStoreBooksModelList);
      testCommonStoreSvc.on('books.filter', vm.fetch);

      testCommonStoreSvc.set('books.filter', _default.filter);
    };

    $scope.$on('$destroy', function() {
      testCommonStoreSvc.get('books.model').off('list:changed', vm.handlers.onStoreBooksModelList);
      testCommonStoreSvc.off('books.filter', vm.fetch);
    });

    this.init();

    return vm;
  }

})();
