(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('TestCommonMementoSvc', Service);

  /** @ngInject */
  function Service() {

    var Constructor = (function() {

      return function () {

        this._data = {};

        return this;

      };

    }());

    Constructor.prototype.$set = function(key, value) {
      try{
        this._data[key] = JSON.stringify(value);
      } catch(e) {

      }
    };

    Constructor.prototype.$get = function(key) {
      var state = this._data[key];

      return state ? JSON.parse(state) : undefined;
    };

    return Constructor;

  }

})();
