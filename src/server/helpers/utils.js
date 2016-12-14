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

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  return {
    generateGUID: generateGUID,
    fetchData: fetchData,
    updateData: updateData,
    shuffle: shuffle
  };

}());