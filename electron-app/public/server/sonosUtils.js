const Sonos = require('sonos');
const { ipcMain } = require('electron');

const discovery = new Sonos.AsyncDeviceDiscovery();

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
