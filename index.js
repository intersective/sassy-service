const express = require('express');
const app = express();

const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
app.use(cors());

const config = require('./config');
const runner = require('./runner');

const port = process.env.PORT || 8080;
const router = express.Router();

router.get('/static/*', function(req, res) {
  let target = path.resolve(path.join('.', req.path));
  res.sendFile(target, {}, (err) => {
    if (err) return res.status(404).end();
  });
});

router.get('/main.css', function(req, res) {
  if (!req.query.p) return res.status(404).end();

  let cssFilePath = path.resolve(
    path.join(config.directory.build, req.query.p, 'build', 'main.css')
  );
  res.sendFile(cssFilePath, {}, (err) => {
    if (err) return res.status(404).end();
  });
});

router.get('/', function(req, res) {
  res.status(200).json({
    status: 'okay',
    port: port
  });
});

app.use('/', router);

const server = http.createServer(app).listen(port, () => {
  console.log('Server listening on port', port);
});
