(function () {
  'use strict';
  var NicerCast = require('./server.js');
  const { ipcMain } = require('electron');
  var Readable = require('stream').Readable;

  // Init a readable stream
  let audioStream = new Readable();
  audioStream._read = () => {};

  ipcMain.on('audioStream', async (event, arg) => {
    let stream = new Uint8Array(arg);
    audioStream.push(stream);
  });

  // Init stream server
  //var server = new NicerCast(audioStream, {});
  //server.start(5000);
})();
