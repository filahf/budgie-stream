const express = require("express");
const { Sonos } = require("sonos");

const DeviceDiscovery = require("sonos").AsyncDeviceDiscovery;
let discovery = new DeviceDiscovery();

const router = express.Router();

router.get("/", async (req, res) => {
  let devices = await discovery.discover();
  let data = await devices;

  res.send(data);
});

module.exports = router;
