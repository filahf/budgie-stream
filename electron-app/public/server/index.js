(function () {
  'use strict';
  var NicerCast = require('./server.js');
  const io = require('socket.io')();
  var Readable = require('stream').Readable;
  const { Sonos } = require('sonos');
  const device = new Sonos('192.168.0.133');
  var ip = require('ip');
  let audioStream = new Readable();
  audioStream._read = () => {};

  io.listen(5001);
  console.log(ip.address());
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('audioStream', (stream) => {
      audioStream.push(stream);
      //console.log(stream);
    });
  });
  var server = new NicerCast(audioStream, {});
  server.start(5000);
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
  play();

  //module.exports = app;
})();
