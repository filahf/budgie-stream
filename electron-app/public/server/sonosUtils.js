const Sonos = require('sonos');
const { ipcMain } = require('electron');
const discovery = new Sonos.AsyncDeviceDiscovery();
//var device = new Sonos('192.168.0.133');
var ip = require('ip');
const Store = require('electron-store');

// Manage store
const store = new Store();
store.set('ip', ip.address());

let groupsAvail = {};
let selectedDevices = [];
// Fetch devices
async function fetchDevices() {
  return discovery
    .discover()
    .then((device, model) => {
      return device.getAllGroups().then((groups) => {
        groupsAvail = groups;
        return JSON.stringify(groups, null, 2);
      });
    })
    .catch((e) => {
      console.warn(' Error in discovery %j', e);
    });
}

ipcMain.on('fetchDevices', async (event, arg) => {
  var devices = await fetchDevices();
  event.sender.send('devices', devices);
});

// Toggle Playback
function togglePlayback() {
  groupsAvail[0]
    .CoordinatorDevice()
    .play('x-rincon-mp3radio://192.168.0.194:5000/stream.mp3')
    .then((success) => {
      console.log('Yeay');
    })
    .catch((err) => {
      console.log('Error occurred %j', err);
    });
}

ipcMain.on('togglePlayback', (event, arg) => {
  selectedDevices = arg;
  console.log('selected devices', arg);
  togglePlayback();
});

// Volume control

ipcMain.on('setVolume', (event, arg) => {
  selectedDevices = arg;
  console.log('selected devices', arg);
  togglePlayback();
});
