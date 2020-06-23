(function () {
  'use strict';
  var NicerCast = require('./server.js');
  var Sonos = require('./sonosUtils');
  var io = require('socket.io')();
  var Readable = require('stream').Readable;
  var { Sonos } = require('sonos');
  var device = new Sonos('192.168.0.133');
  var ip = require('ip');
  const Store = require('electron-store');

  // Manage store
  const store = new Store();
  console.log(store.get('unicorn'));

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
  var server = new NicerCast(audioStream, {});
  //server.start(5000);
  /*   function startServer() {}
   */

  function play() {
    device
      .play('x-rincon-mp3radio://192.168.0.194:5000/stream.mp3')
      .then((success) => {
        console.log('Yeay');
      })
      .catch((err) => {
        console.log('Error occurred %j', err);
      });
  }
  //play();

  //module.exports = app;
})();
