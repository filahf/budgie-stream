(function () {
  'use strict';
  var NicerCast = require('./server.js');
  var Sonos = require('./sonosUtils');
  var io = require('socket.io')();
  var Readable = require('stream').Readable;

  // Init a readable stream
  let audioStream = new Readable();
  audioStream._read = () => {};
  // Socket init
  io.listen(5001);
  // Get raw audio in PCM int 16 from client side
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('audioStream', (stream) => {
      // Push raw audio to the readable stream
      audioStream.push(stream);
    });
  });

  // Init stream server
  // var server = new NicerCast(audioStream, {});
  // server.start(5000);
  /*   function startServer() {}
   */
})();
