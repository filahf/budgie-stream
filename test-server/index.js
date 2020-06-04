const express = require("express");
const app = express();
const port = 3000;
const { Sonos } = require("sonos");
const AudioRecorder = require("node-audiorecorder");
const ffmpeg = require("fluent-ffmpeg");

const device = new Sonos("192.168.0.42");

const audioRecorder = new AudioRecorder(
  {
    program: process.platform === "win32" ? "sox" : "rec",
    silence: 0,
  },
  console
);

var audioStream = audioRecorder.start();
//audioRecorder.start();
process.stdin.resume();
app.get("/stream.mp3", function (req, res) {
  res.type("mp3");
  var stream = ffmpeg().input(audioStream.stream()).toFormat("mp3");
  stream.pipe(res);
});

app.get("/", function (req, res) {
  res.send("hello world");
  // device
  //   .play("https://192.168.0.48:3000/stream.mp3")
  //   .then((success) => {
  //     console.log("Yeay");
  //   })
  //   .catch((err) => {
  //     console.log("Error occurred %j", err);
  //   });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
