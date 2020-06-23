const port = 3000;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { DeviceDiscovery, Listener } = require("sonos");

const mainDeviceRoomName = 'Office'
let mainDevice;
let otherDevices = {};

let currentState;
let currentTrack;
let currentVolume;
DeviceDiscovery((device) => {
  device.deviceDescription().then(desc => {
    if (desc.roomName == mainDeviceRoomName) {
      console.log(`Found Main Device: ${desc.roomName}:${device.host}`)
      mainDevice = device
      Listener.subscribeTo(mainDevice)

      // mainDevice.searchMusicLibrary('playlists').then()

      mainDevice.on('PlayState', result => {
        currentState = result
        io.sockets.emit('play-state-change', result)
      })

      mainDevice.on('CurrentTrack', result => {
        currentTrack = result
        io.sockets.emit('current-track-change', result)
      })

      mainDevice.on('Volume', result => {
        currentVolume = result
        io.sockets.emit('volume-change', result)
      })
    } else {
      otherDevices[desc.roomName] = device
    }
  });
});

let currentTopology;
Listener.on('ZoneGroupTopology', result => {
  currentTopology = result;
  io.sockets.emit('topology-change', result);

  console.log('topo')
})

app.use(express.static("dist"));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/devices", (req, res) => res.send(devices));

app.get('/groups', async (req, res) => {
  let groups = await mainDevice.getAllGroups();
  res.send(groups);
});

app.get('/groups/:deviceName/:action', async (req, res) => {
  const { deviceName, action } = req.params;

  console.log(`${deviceName} : ${action}`);

  if (action == 'add') {
    otherDevices[deviceName].joinGroup(mainDeviceRoomName);
  } else {
    otherDevices[deviceName].leaveGroup();
  }

  res.send('Ok')
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('topology-change', currentTopology)
  socket.emit('play-state-change', currentState)
  socket.emit('current-track-change', currentTrack)
  socket.emit('volume-change', currentVolume)

  socket.on('setIsPlaying', (isPlaying) => {
    if (isPlaying) {
      mainDevice.play()
    } else {
      mainDevice.pause()
    }
  })

  socket.on('next', () => mainDevice.next())
  socket.on('previous', () => mainDevice.previous())
  socket.on('set-volume', (v) => mainDevice.setVolume(v))
});

http.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);


// Subscribe to the CTRL + C event and cancel the current subscribtions
process.on('SIGINT', () => {
  console.log('Hold-on cancelling all subscriptions')
  Listener.stopListener().then(result => {
    console.log('Cancelled all subscriptions')
    process.exit()
  }).catch(err => {
    console.log('Error cancelling subscriptions, exit in 3 seconds  %s', err)
    setTimeout(() => {
      process.exit(1)
    }, 2500)
  })
})