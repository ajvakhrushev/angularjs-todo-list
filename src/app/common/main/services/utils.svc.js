(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('testCommonUtilsSvc', Service);

  /** @ngInject */
  function Service(
    $templateCache,
    $http,
    ENV
  ) {

    var self = this;

    this.$get = function () {
      return this;
    };

    self.templateCacheHelper = {
      get: function(input) {
        var data = $templateCache.get(input);

        return angular.isArray(data) ? data[1] : data;
      }
    };

    self.safeApply = function(scope, fn) {
      var phase = scope.$root.$$phase;
      
      if(phase === '$apply' || phase === '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        scope.$apply(fn);
      }

    };

    self.inherit = function (Child, Parent) {
      Child.prototype = Object.create(Parent.prototype);
      Child.prototype.constructor = Child;
    };

    self.generateGUID = (function() {

      var regexReplaceGUID = /[xy]/g;

      function onReplaceGUID(c) {
        var r = Math.random() * 16|0,
            v = c === 'x' ? r : (r&0x3|0x8);

        return v.toString(16);
      }

      return function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(regexReplaceGUID, onReplaceGUID);
      };

    }());
    
    self.getMaxInteger = (function() {

      var MAX_INTEGER = 9007199254740992;

      return function() {
          return Number.MAX_SAFE_INTEGER || MAX_INTEGER;
      };

    }());

    self.makeNumbersArray = function(length) {
      return Array.apply(null, {length: length}).map(Number.call, Number);
    };

    self.print = function(content) {
      var popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write('<html><head></head><body>' + content + '</body></html>');
      popupWin.print();
    };

    self.isPreEdgeIE = function() {
      return !(window.ActiveXObject) && "ActiveXObject" in window;
    };

    self.containElement = function containElement(el, search) {
      if(el === search) {
        return true;
      }

      if(!!search.parentNode) {
        return containElement(el, search.parentNode);
      }

      return null;
    };

    self.copy = function(data) {
      return data ? JSON.parse(JSON.stringify(data)) : null;
    };

    self.makeSrcFromBase64 = function (base64, type) {
      return "data:" + type + ';base64,' + base64;
    };

    self.rgbToHex = (function() {

      function componentToHex(c) {
        var hex = c.toString(16);

        return hex.length === 1 ? ("0" + hex) : hex;
      }

      return function (r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      };

    }());

    self.hexToRgb = (function() {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          matchRegex =  /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

      function shorthandToFull(hex) {
        return hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
      }

      return function (hex) {
        var result = matchRegex.exec(shorthandToFull(hex));

        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      };

    }());

    self.request = {

      get: function(url, data, options) {
        return $http(Object.assign({
          method: "GET",
          url: ENV.endpoint + (url || '/'),
          params: data || {}
        }, options || {}));
      },

      post: function(url, data, options) {
        return $http(Object.assign({
          method: "POST",
          url: ENV.endpoint + (url || '/'),
          data: data || {}
        }, options || {}));
      },

      put: function(url, data, options) {
        return $http(Object.assign({
          method: "PUT",
          url: ENV.endpoint + (url || '/'),
          data: data || {}
        }, options || {}));
      },

      patch: function(url, data, options) {
        return $http(Object.assign({
          method: "POST",
          url: ENV.endpoint + (url || '/'),
          data: data || {}
        }, options || {}));
      },

      "delete": function(url, data, options) {
        return $http(Object.assign({
          method: "DELETE",
          url: ENV.endpoint + (url || '/')
        }, options || {}));
      }

    };

    return self;

  }

})();
