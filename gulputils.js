'use strict';

module.exports = (function () {

  var plumperHandler = {
    handleError: function (err) {
      console.log(err);
      this.emit('end');
    }
  };

  return {
    plumperHandler: plumperHandler
  }

}());