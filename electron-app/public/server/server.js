(function () {
  'use strict';
  var cors = require('cors');
  var express = require('express');
  var http = require('http');
  var icecast = require('icecast-stack');
  var ip = require('ip');
  var lame = require('@suldashi/lame');
  var stream = new require('stream');

  // 16-bit signed samples
  var SAMPLE_SIZE = 16,
    CHANNELS = 2,
    SAMPLE_RATE = 24000;

  // If we're getting raw PCM data as expected, calculate the number of bytes
  // that need to be read for `1 Second` of audio data.
  /*   var BLOCK_ALIGN = (SAMPLE_SIZE / 8) * CHANNELS,
    BYTES_PER_SECOND = SAMPLE_RATE * BLOCK_ALIGN; */

  var Server = function (inputStream, opts) {
    console.log(this.server);
    var app = express();
    this.app = app;
    app.use(cors());
    this.serverPort = false;
    this.inputStream = inputStream;
    app.disable('x-powered-by');

    opts.name = 'BudgieStream';

    var throttleStream = stream.PassThrough();
    this._internalStream = throttleStream;
    this.inputStream.pipe(throttleStream);

    // stream playlist (points to other endpoint)
    var playlistEndpoint = function (req, res) {
      var addr = ip.address();

      res.status(200);
      res.set('Content-Type', 'audio/x-mpegurl');
      res.send('http://' + addr + ':' + this.serverPort + '/listen');
    }.bind(this);

    app.get('/', playlistEndpoint);
    app.get('/listen.m3u', playlistEndpoint);
    app.get('/stream.mp3', playlistEndpoint);

    // audio endpoint
    app.get(
      '/listen',
      function (req, res, next) {
        var acceptsMetadata = req.headers['icy-metadata'] === 1;

        // generate response header
        var headers = {
          'Content-Type': 'audio/mpeg',
          Connection: 'close',
        };

        if (acceptsMetadata) {
          headers['icy-metaint'] = 8192;
        }

        res.writeHead(200, headers);

        // setup metadata transport
        if (acceptsMetadata) {
          res = new icecast.IcecastWriteStack(res, 8192);
          res.queueMetadata(this.metadata || opts.name);
        }

        // setup encoder
        var encoder = new lame.Encoder({
          channels: CHANNELS,
          bitDepth: SAMPLE_SIZE,
          sampleRate: SAMPLE_RATE,
        });

        var prevMetadata = 0;
        encoder.on(
          'data',
          function (chunk) {
            if (acceptsMetadata && prevMetadata != this.metadata) {
              res.queueMetadata(this.metadata || opts.name);
              prevMetadata = this.metadata;
            }

            res.write(chunk);
          }.bind(this)
        );

        var callback = function (chunk) {
          encoder.write(chunk);
        };

        throttleStream.on('data', callback);

        req.connection.on('close', function () {
          encoder.end();
          throttleStream.removeListener('data', callback);
        });
      }.bind(this)
    );
  };

  Server.prototype.start = function (port, callback) {
    this.serverPort = port != null ? port : 0;
    this.server = http.createServer(this.app).listen(
      this.serverPort,
      function () {
        console.log('Https App started');
        this.serverPort = this.server.address().port;

        if (callback && typeof callback === 'function') {
          callback(this.serverPort);
        }
      }.bind(this)
    );
  };

  Server.prototype.setInputStream = function (inputStream) {
    this.inputStream.unpipe();
    this.inputStream = inputStream;
    this.inputStream.pipe(this._internalStream);
  };

  Server.prototype.setMetadata = function (metadata) {
    this.metadata = metadata;
  };

  Server.prototype.server = function () {
    return this.server;
  };

  Server.prototype.stop = function () {
    console.log('STOPPING');
    try {
      this.server.close();
    } catch (err) {}
  };

  module.exports = Server;
})();
