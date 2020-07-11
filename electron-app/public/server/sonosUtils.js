const Sonos = require('sonos');
const { ipcMain } = require('electron');
const discovery = new Sonos.AsyncDeviceDiscovery();

var ip = require('ip');

let groupsAvail = {};

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

//Url
const url = 'x-rincon-mp3radio://' + ip.address() + ':5000/stream.mp3';
const metaData = `<DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/"><item id="R:0/0/49" parentID="R:0/0" restricted="true"><upnp:albumArtURI>https://filahf.github.io/budgie-stream-supporters/icon.png</upnp:albumArtURI><dc:title>Budgie Stream</dc:title></item></DIDL-Lite>`;

// Toggle Playback
function togglePlayback(devices, startPlaying) {
  groupsAvail.map((group) => {
    if (devices.includes(group.Name)) {
      if (startPlaying) {
        group
          .CoordinatorDevice()
          .play({
            uri:
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            metadata: metaData,
          })
          .then((success) => {
            console.log('Yeay');
          })
          .catch((err) => {
            console.log('Error occurred %j', err);
          });
      } else {
        group.CoordinatorDevice().stop();
      }
    }
  });

  // if (startPlaying) {
  //   groupsAvail[0]
  //     .CoordinatorDevice()
  //     .play({
  //       uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  //       metadata: metaData,
  //     })
  //     .then((success) => {
  //       console.log('Yeay');
  //     })
  //     .catch((err) => {
  //       console.log('Error occurred %j', err);
  //     });
  // } else {
  //   groupsAvail[0].CoordinatorDevice().stop();
  // }
}

ipcMain.on('togglePlayback', (event, arg) => {
  const { devices, startPlaying } = arg;
  const deviceNames = devices.map((a) => a.name);
  togglePlayback(deviceNames, startPlaying);
});

// Volume control

function setVolume(device, volume) {
  console.log('Setting volume on ', device, 'at ', volume);
  groupsAvail[0].CoordinatorDevice().setVolume(volume);
}

ipcMain.on('setVolume', (event, arg) => {
  console.log('selected devices', arg);
  setVolume(arg.device, arg.volume);
});
