(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('TestCommonRestModelSvc', Service);

  /** @ngInject */
  function Service(
    TestCommonObserverSvc
  ) {

    var Constructor = (function() {

      return function(options) {

        var data = options || {};

        this.url = data.url || null;
        this.headers = data.headers || {};

        this.fetch = data.fetch && typeof data.fetch === 'function' ? data.fetch : null;
        this.create = data.create && typeof data.create === 'function' ? data.create : null;
        this.read = data.read && typeof data.read === 'function' ? data.read : null;
        this.update = data.update && typeof data.update === 'function' ? data.update : null;
        this.delete = data.delete && typeof data.delete === 'function' ? data.delete : null;

      };
        
    }());

    Object.assign(Constructor.prototype, new TestCommonObserverSvc());

    return Constructor;

  }

})();