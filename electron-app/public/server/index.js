(function () {
  'use strict';
  let express = require('express');
  var cors = require('cors');
  const http = require('http');

  const port = process.env.PORT || 5000;

  const app = express();
  const server = http.createServer(app);
  app.use(cors());

  app.get('/', function (req, res) {
    res.send('Hello world! Filip Åhfelt here!');
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));

  module.exports = app;
})();
