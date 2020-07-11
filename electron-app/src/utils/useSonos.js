import { startRecording, stopRecording } from './recorder';
const { ipcRenderer } = window.require('electron');

export const fetch = () => {
  ipcRenderer.send('fetchDevices', null);
};

export const togglePlay = (devices, startPlaying) => {
  //fixa den här if satsen
  if (startPlaying) {
    startRecording();
  } else {
    stopRecording();
  }
  devices = devices.map((a) => a.name);
  ipcRenderer.send('togglePlayback', { devices, startPlaying });
};

export const setVolume = (devices) => {
  console.log(devices, 'vol');
  ipcRenderer.send('setVolume', devices);
};
