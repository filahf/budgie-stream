import React from 'react';

import { ClientProvider } from './utils/ClientContext';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MainBar from './components/MainBar/MainBar';
import Header from './components/Header/Header';
import SelectDevices from './components/Devices/SelectDevices';
import Welcome from './components/Welcome/Welcome';

import socketIOClient from 'socket.io-client';
const { desktopCapturer } = window.require('electron');
const ENDPOINT = 'localhost:5001';
const socket = socketIOClient(ENDPOINT);

desktopCapturer.getSources({ types: ['screen'] }).then(async (sources) => {
  for (const source of sources) {
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
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
  footer: {
    marginTop: 'auto',
    bottom: 0,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ClientProvider>
      <div className={classes.root}>
        <Header />
        <Container component='main' className={classes.main}>
          <Welcome>
            <SelectDevices />
          </Welcome>
        </Container>
        <div className={classes.footer}>
          <MainBar />
        </div>
      </div>
    </ClientProvider>
  );
}

export default App;
