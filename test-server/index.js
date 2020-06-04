const express = require("express");
const app = express();
const port = 3000;
const { Sonos } = require("sonos");
var { Decoder } = require("@suldashi/lame");
const AudioRecorder = require("node-audiorecorder");

//192.168.0.48

const device = new Sonos("192.168.0.42");

const fs = require("fs"),
  path = require("path");

// Constants.
const DIRECTORY = "examples-recordings";

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
//audioRecorder.start().stream().pipe(fileStream);

// Write incoming data out the console.
// audioRecorder.stream().on(`data`, function (chunk) {
//   console.log(chunk);
// });

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
app.get("/stream.wav", function (req, res) {
  res.set({
    "Content-Type": "audio/wav",
  });
  audioRecorder.start().stream().pipe(res);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
