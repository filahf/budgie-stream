(function () {
  'use strict';
  var NicerCast = require('./server.js');
  const io = require('socket.io')();
  //const device = new Sonos("192.168.0.42");
  var ip = require('ip');

  io.listen(5001);

  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('audioStream', (stream) => {
      console.log(stream);
    });
  });

  function startServer() {
    var server = new NicerCast(process.stdin, {});
    server.start(5000);
  }
  //setTimeout(startServer, 4500);

  // function play() {
  //   device
  //     .play("x-rincon-mp3radio://192.168.0.48:5000/stream.mp3")
  //     .then((success) => {
  //       console.log("Yeay");
  //     })
  //     .catch((err) => {
  //       console.log("Error occurred %j", err);
  //     });
  // }

  //module.exports = app;
})();
