# stream-to-sonos
Run instructions
clone the repo

## The test server
Express server.

Will capture microphone audio and broadcast to `http:localhost:3000/stream.mp3`. Access the stream on a device on the same LAN by replacing localhost with your local ip address.
### Run instructions
```
cd test-server
yarn install
yarn dev
```

## The app
Electron based for cross-platform support.
Boilerplate available [here](https://github.com/filahf/react-electron-express-boilerplate)
