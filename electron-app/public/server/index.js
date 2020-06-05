(function () {
  "use strict";
  var NicerCast = require("./server.js");
  const AudioRecorder = require("node-audiorecorder");
  //const device = new Sonos("192.168.0.42");
  var ip = require("ip");

  const audioRecorder = new AudioRecorder(
    {
      program: process.platform === "win32" ? "sox" : "rec",
      silence: 0,
    },
    console
  );

  var server = new NicerCast(audioRecorder.start().stream(), {});
  server.start(5000);

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

  // setTimeout(play, 4500);

  //module.exports = app;
})();
