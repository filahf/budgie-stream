import { useContext } from 'react';
import { ClientContext } from './ClientContext';
import { startRecording, stopRecording } from './recorder';
const { ipcRenderer } = window.require('electron');
export function togglePlay(devices, startPlaying) {
  if (startPlaying) {
    startRecording();
  } else {
    stopRecording();
  }
  ipcRenderer.send('togglePlayback', { devices, startPlaying });
}
