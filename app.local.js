const express = require('express');
const app = express();

const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
app.use(cors());

const config = require('./config');
const runner = require('./runner');

const port = process.env.PORT || 8888;
const router = express.Router();

router.get('/*.css', function(req, res) {
  if (!req.query.p) return res.status(404).end();

  let cssFilePath = path.resolve(
    path.join(config.directory.build, req.query.p, 'build', req.path)
  );
  res.sendFile(cssFilePath, {}, (err) => {
    if (err) return res.status(404).end();
  });
});

router.get('/**/**.*', function(req, res) {
  let target = path.resolve(path.join('./static', req.path));
  res.sendFile(target, {}, (err) => {
    if (err) return res.status(404).end();
  });
});

router.get('/', function(req, res) {
  res.status(200).json({
    status: 'okay',
    port: port
  });
});

router.get('/compile', function(req, res) {
  let programs = [
    {
      id: 260,
      name: 'Generic app V1',
      styleVersion: 'app-v1',
      rootFile: 'practera.scss',
      files: [
        {
          target: 'custom-variables.scss',
          vars: {
            'version': '260',
            // 'primary': '#2bbfd4',
            'primary': '#e81c4f',
            'secondary': '#f5f6fa'
          }
        }
      ]
    },
    {
      id: 'default',
      name: 'July 2017',
      styleVersion: 'v1',
      rootFile: 'practera.scss',
      files: []
    }
  ]

  runner.build(programs, () => {
    res.status(200).json({
      status: 'okay',
      port: port
    });
  });
});

app.use('/', router);

if (app.get('env') === 'local') {
  const server = http.createServer(app).listen(port, () => {
    console.log('Server listening on port', port);
  });
} else {
  // use API Gateway to handle the web requests instead of TCP port
  module.exports = app;
}
