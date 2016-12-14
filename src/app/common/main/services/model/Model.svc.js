(function () {
  'use strict';

  angular
    .module('test.common')
    .factory('TestCommonModelSvc', Service);

  /** @ngInject */
  function Service(
    KbCommonObserverSvc,
    KbCommonOrderModelSvc,
    KbCommonFilterModelSvc,
    KbCommonRestModelSvc
  ) {

    var Constructor = (function() {

      return function(options) {
        var data = options || {};

        this.list = [];
        this.item = null;
        this.length = data.length || 0;
        this.limit = data.limit || 100;
        this.offset = data.offset || 0;

        this.order = new KbCommonOrderModelSvc(data.order || []);
        this.filter = new KbCommonFilterModelSvc(data.filter || []);
        this.rest = new KbCommonRestModelSvc(data.rest || {});

        this.fetch = function(data, options) {
          if(!data) {
            data = {};
          }

          var self = this,
              params = {
                "limit": this.limit,
                "offset": data.offset || 0,
                "order": this.order.preUpdate(data.order),
                "filter": this.filter.preUpdate(data.filter)
              };

          return this.rest.fetch(params, options).then(function(response) {
            self.offset = params.offset;

            if(params.offset === 0) {
              self.list = response.list;
              self.length = response.length;
            } else {
              self.list = self.list.concat(response.list);
            }

            self.order.set(params.order);
            self.filter.set(params.filter);

            self.trigger('list:changed');

            return self.list;
          });
        };

        this.setItem = function(id) {
          var self = this,
              item = self.list.find(function(next) {
                return next.id === id;
              });

          self.rest.read({id: id}).then(function(data) {
            Object.assign(item, data);

            self.trigger('item:changed');
          });
        };

        return this;

      };

    }());

    Object.assign(Constructor.prototype, new KbCommonObserverSvc());

    return Constructor;

  }

}());