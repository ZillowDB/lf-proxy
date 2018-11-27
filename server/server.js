// require('newrelic');
require('dotenv').config();
const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');
const http = require('http');
const { getOptions } = require('./routes');
const template = require('./views/template');
const imageRender = require('../image-carousel/public/dist/server').default;

const port = process.env.PORT || 3000;
const NHOMES = 10e6;

const apiProxy = httpProxy.createProxyServer();
// const serverMortgage = process.env.MORTGAGE;
// const serverDescription = process.env.DESCRIPTION;
// const serverNearby = process.env.NEARBY;
const serverImages = process.env.IMAGES;

const app = express();

const serverRender = (home, req, res) => {
  let images = [];
  const options = getOptions(home, 'images');
  http.get(process.env.IMAGES, options, (iRes) => {
    let resData = '';
    iRes.on('data', (data) => { resData += data; });
    iRes.on('end', () => {
      images = JSON.parse(resData).data;
      const content = imageRender(images);
      const response = template('Zillow rendered Server-side', content);
      res.setHeader('Cache-Control', 'assets, max-age=604800');
      res.send(response);
    });
  }).on('error', (err) => { console.log(`Error: ${err.message}`); });
};

app.get('/homes/:home', (req, res) => {
  const { home } = req.params;
  serverRender(home, req, res);
});

app.get('/', (req, res) => {
  const home = Math.floor(Math.random() * NHOMES) + 1;
  serverRender(home, req, res);
});

// Client side render of page
app.get('/client', (req, res) => {
  const response = template('Zillow rendered Client-side');
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
});

// Static files
app.use(express.static(path.resolve(__dirname, '../public')));

// app.all('/api/homes/:home/prices', (req, res) => {
//   apiProxy.web(req, res, { target: serverMortgage });
// });

// app.all('/api/homes/:home/detail-information', (req, res) => {
//   apiProxy.web(req, res, { target: serverDescription });
// });

// app.all('/api/homes/:home/nearbyhomes', (req, res) => {
//   apiProxy.web(req, res, { target: serverNearby });
// });

app.all('/api/homes/:home/images', (req, res) => {
  apiProxy.web(req, res, { target: serverImages });
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
