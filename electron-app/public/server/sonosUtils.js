const Sonos = require('sonos');
const { ipcMain } = require('electron');
const discovery = new Sonos.AsyncDeviceDiscovery();
//var device = new Sonos('192.168.0.133');
var ip = require('ip');
const Store = require('electron-store');

// Manage store
const store = new Store();
store.set('ip', ip.address());

async function fetchDevices() {
  return discovery
    .discover()
    .then((device, model) => {
      return device.getAllGroups().then((groups) => {
        console.log('async func');
        return JSON.stringify(groups, null, 2);
      });
    })
    .catch((e) => {
      console.warn(' Error in discovery %j', e);
    });
}

ipcMain.on('fetchDevices', async (event, arg) => {
  var devices = await fetchDevices();
  console.log(devices);
  event.sender.send('devices', devices);
});

function play() {
  device
    .play('x-rincon-mp3radio://192.168.0.194:5000/stream.mp3')
    .then((success) => {
      console.log('Yeay');
    })
    .catch((err) => {
      console.log('Error occurred %j', err);
    });
}
//play();
