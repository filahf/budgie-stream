import React from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
const { desktopCapturer } = window.require('electron');
//const { ipcRender } = window.require('electron');
const ENDPOINT = 'localhost:5001';
const socket = socketIOClient(ENDPOINT);

desktopCapturer.getSources({ types: ['screen'] }).then(async (sources) => {
  for (const source of sources) {
    console.log(sources);
    if (source.name === 'Screen 1') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            mandatory: {
              chromeMediaSource: 'desktop',
            },
          },
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
            },
          },
        });
        handleStream(stream);
      } catch (e) {
        console.log(e);
      }
      return;
    }
  }
});

const handleStream = (stream) => {
  const audioTrack = new MediaStream([stream.getTracks()[0]]);
  console.log(stream.getTracks());
  var audioContext = window.AudioContext;
  var context = new audioContext();
  var audioInput = context.createMediaStreamSource(audioTrack);
  var bufferSize = 2048;
  // create a javascript node
  var recorder = context.createScriptProcessor(bufferSize, 1, 1);
  // specify the processing function
  recorder.onaudioprocess = recorderProcess;
  // connect stream to our recorder
  audioInput.connect(recorder);
  // connect our recorder to the previous destination
  recorder.connect(context.destination);
};

function convertFloat32ToInt16(buffer) {
  let l = buffer.length;
  let buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l]) * 0x7fff;
  }
  return buf.buffer;
}

function recorderProcess(e) {
  var left = e.inputBuffer.getChannelData(0);
  socket.emit('audioStream', convertFloat32ToInt16(left));
  //console.log(convertFloat32ToInt16(left));
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
