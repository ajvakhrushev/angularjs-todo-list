const express = require('express');
const PATH = require('./config');

const PORT = process.env.PORT || 3000;

// application server
const app = express();

app.use('/bower_components',  express.static(PATH.root + '/bower_components'));
app.use('/app', express.static(PATH.app));
app.use('/assets', express.static(PATH.assets));

app.get(/^.*$/, function (req, res) {
  res.sendFile(PATH.app + '/index.html');
});

app.listen(PORT, function () {
  console.log('App Server running on port ' + PORT);
});
