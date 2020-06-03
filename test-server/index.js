const express = require("express");
const app = express();
const port = 3000;
var { Encoder, STEREO } = require("@suldashi/lame");
const { Sonos } = require("sonos");

//192.168.0.48

const device = new Sonos("192.168.0.42");

const fs = require("fs"),
  path = require("path");

// Constants.
const DIRECTORY = "examples-recordings";

const AudioRecorder = require("node-audiorecorder");

const audioRecorder = new AudioRecorder(
  {
    program: process.platform === "win32" ? "sox" : "rec",
    silence: 0,
  },
  console
);

if (!fs.existsSync(DIRECTORY)) {
  fs.mkdirSync(DIRECTORY);
}

// Create file path with random name.
const fileName = path.join(
  DIRECTORY,
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 4)
    .concat(".wav")
);
console.log("Writing new recording file at: ", fileName);

// Create write stream.
const fileStream = fs.createWriteStream(fileName, { encoding: "binary" });

// Start and write to the file.
audioRecorder.start().stream().pipe(fileStream);

// Log information on the following events
audioRecorder.stream().on("close", function (code) {
  console.warn("Recording closed. Exit code: ", code);
});
audioRecorder.stream().on("end", function () {
  console.warn("Recording ended.");
});
audioRecorder.stream().on("error", function () {
  console.warn("Recording error.");
});
// Write incoming data out the console.
// audioRecorder.stream().on(`data`, function (chunk) {
//   console.log(chunk);
// });

var encoder = new Encoder({
  // input
  channels: 2, // 2 channels (left and right)
  bitDepth: 16, // 16-bit samples
  sampleRate: 44100, // 44,100 Hz sample rate

  bitRate: 128,
  outSampleRate: 22050,
  mode: STEREO,
});

device
  .play("https://192.168.0.48:3000/stream.mp3")
  .then((success) => {
    console.log("Yeay");
  })
  .catch((err) => {
    console.log("Error occurred %j", err);
  });

device.getVolume().then((volume) => console.log(`current volume = ${volume}`));

//   .play("http://192.168.0.48:3000/stream.wav")

// Keep process alive.
process.stdin.resume();
console.warn("Press ctrl+c to exit.");
app.get("/stream.mp3", function (req, res) {
  res.set({
    "Content-Type": "audio/mpeg",
    "Transfer-Encoding": "chunked",
  });
  audioRecorder.stream().pipe(res);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
