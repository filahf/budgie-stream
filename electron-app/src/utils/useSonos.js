import { startRecording, stopRecording } from './recorder';
const { ipcRenderer } = window.require('electron');

export const togglePlay = (devices, startPlaying) => {
  //fixa den här if satsen
  if (startPlaying) {
    startRecording();
  } else {
    stopRecording();
  }
  ipcRenderer.send('togglePlayback', { devices, startPlaying });
};

export const setVolume = (device, volume) => {
  console.log('set volume on ', device, 'at', volume);
  ipcRenderer.send('setVolume', { device, volume });
};
