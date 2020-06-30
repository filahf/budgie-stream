import { useContext } from 'react';
import { ClientContext } from './ClientContext';
import { startRecording } from './recorder';
const { ipcRenderer } = window.require('electron');
export function togglePlay(devices, startPlaying) {
  console.log(startPlaying);
  if (startPlaying) {
    startRecording();
    ipcRenderer.send('togglePlayback', devices);
  } else {
    ipcRenderer.send('pause', devices);
  }
}
