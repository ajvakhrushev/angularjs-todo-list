module.exports = function() {

  this.makeMultiplyFn = function (list) {
    var length = list.length;

    list.sort((prev, next) => prev.order > next.order ? 1 : -1);

    return function(prev, next) {
      var a, b, item, reverse, result, i;

      for(i = 0; i < length; i++) {
        result = 0;
        item = list[i];

        a = prev[item.key];
        b = next[item.key];

        reverse = item.value ? -1 : 1;

        if (a < b) {
          result = reverse * -1;
        }

        if (a > b) {
          result = reverse * 1;
        }

        if(result !== 0) {
          return result;
        }
      }

      return result;
    };
  };

};