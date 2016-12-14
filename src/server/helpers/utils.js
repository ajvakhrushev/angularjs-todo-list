const fs = require('fs');
const path = require('path');

module.exports = (function() {

  const generateGUID = (function() {

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

  function fetchData(fileName) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'))
  }

  function updateData(fileName, data) {
    return fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf8')
  }

  return {
    generateGUID: generateGUID,
    fetchData: fetchData,
    updateData: updateData
  };

}());