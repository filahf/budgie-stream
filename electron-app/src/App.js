import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";

import "./App.css";
//const { ipcRender } = window.require('electron');
const ENDPOINT = "localhost:5000";

function App() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("connect", function (data) {
      socket.emit("join", "Hello World from client");
    });
  }, []);
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
