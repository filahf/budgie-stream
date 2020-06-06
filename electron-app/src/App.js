import React from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
const { desktopCapturer } = window.require("electron");
//const { ipcRender } = window.require('electron');
const ENDPOINT = "localhost:5001";
const socket = socketIOClient(ENDPOINT);

desktopCapturer
  .getSources({ types: ["window", "screen", "Desktop"] })
  .then(async (sources) => {
    for (const source of sources) {
      console.log(sources);
      if (source.name === "Entire Screen") {
        try {
          const stream = await navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((mediaStream) => {
              var mediaRecorder = new MediaRecorder(mediaStream);
              mediaRecorder.ondataavailable = (e) => {
                console.log(e.data);
                socket.emit("stream", e.data);
              };
            });
          console.log(stream);
        } catch (e) {
          console.log(e);
        }
        return;
      }
    }
  });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
