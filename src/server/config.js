const path = require('path');

module.exports = (function() {

  var root = path.resolve(__dirname, '../../'),
      src = root + '/src';

  return {
    root: root,
    src: src,
    app: src + '/app',
    assets: src + '/assets',
    fixture: src + '/assets/fixture'
  };

}());
