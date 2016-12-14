(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('TestCommonStoreSvc', Service);

  /** @ngInject */
  function Service(
    TestCommonObserverSvc
  ) {

    var Constructor = (function() {

      return function () {

        return this;

      };

    }());

    Constructor.prototype.set = function(key, value) {
      if(!key) {
        return;
      }

      var pathToItem = key.split('.'),
          lastItem = pathToItem.pop(),
          hash = this;

      for(var i = 0, prop, length = pathToItem.length; i < length; i += 1) {
        prop = pathToItem[i];

        if(hash[prop] === undefined) {
          hash[prop] = {};
        }

        hash = hash[prop];
      }

      hash[lastItem] = value;

      this.trigger(key, value);
    };

    Constructor.prototype.get = function(key) {
      if(!key) {
        return;
      }

      return key.split('.').reduce(function(prev, next) {
        if(prev !== undefined || prev[next] !== undefined) {
          prev = prev[next];
        }

        return prev;
      }, this);
    };

    Constructor.prototype.makeGetter = function(key) {
      var self = this;

      return function() {
        return self.get(key);
      };
    };

    Object.assign(Constructor.prototype, new TestCommonObserverSvc());

    return Constructor;

  }

})();
