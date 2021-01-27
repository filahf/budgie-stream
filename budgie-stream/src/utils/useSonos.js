import { startRecording, stopRecording } from "./recorder";
const { ipcRenderer } = window.require("electron");

export const fetch = () => {
  ipcRenderer.send("fetchDevices", null);
};

export const togglePlay = (devices, startPlaying) => {
  startPlaying ? startRecording() : stopRecording();
  devices = devices.map((a) => a.name);
  ipcRenderer.send("togglePlayback", { devices, startPlaying });
};

export const setVolume = (devices) => {
  ipcRenderer.send("setVolume", devices);
};
