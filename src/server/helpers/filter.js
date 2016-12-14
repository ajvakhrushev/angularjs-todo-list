module.exports = function() {

  this.makeMultiplyFn = function (list) {
    var length = list.length,
        strategies = list.map((next) => {
          var strategy = this.strategies.define(next);

          next.method = strategy ? strategy.method : undefined;

          return next;
        });

    return function(next) {
      for(i = 0; i < length; i++) {
        var item = strategies[i],
            value = item.category === 'string' ? next[item.key].toLowerCase() : next[item.key];

        if(!item.method(value, item.value)) {
          return false;
        }
      }

      return true;
    };
  };

  this.strategies = (function() {

    var list = [
      {
        category: 'common',
        type: 'equals',
        method: (value, search) => value === search
      },
      {
        category: 'common',
        type: 'notEqual',
        method: (value, search) => value !== search
      },
      {
        category: 'common',
        type: 'in',
        method: (value, search) => search.indexOf(value) !== -1
      },
      {
        category: 'number',
        type: 'lessThan',
        method: (value, search) => value < search
      },
      {
        category: 'number',
        type: 'lessThanOrEqual',
        method: (value, search) => value <= search
      },
      {
        category: 'number',
        type: 'greaterThan',
        method: (value, search) => value > search
      },
      {
        category: 'number',
        type: 'greaterThanOrEqual',
        method: (value, search) => value >= search
      },
      {
        category: 'string',
        type: 'contains',
        method: (value, search) => value.indexOf(search) !== -1
      },
      {
        category: 'string',
        type: 'startsWith',
        method: (value, search) => value.startsWith(search)
      },
      {
        category: 'string',
        type: 'endsWith',
        method: (value, search) => value.endsWith(search)
      }
    ];

    return {
      list: list,
      define: function() {
        var data = arguments[0] || {};

        return list .filter((next) => next.category === 'common' || next.category === data.category)
                    .find((next) => next.type === data.type);
      }
    };

  }());

};