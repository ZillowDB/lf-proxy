require('newrelic');
require('dotenv').config();
const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');
const template = require('./views/template');

const port = process.env.PORT || 3000;

const apiProxy = httpProxy.createProxyServer();
// const serverMortgage = process.env.MORTGAGE;
// const serverDescription = process.env.DESCRIPTION;
// const serverNearby = process.env.NEARBY;
const serverImages = process.env.IMAGES;

const app = express();


app.get('/client', (req, res) => {
  const response = template('Zillow rendered Client-side');
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
});

app.use(express.static(path.resolve(__dirname, '../public')));

// app.all('/homes/:home/prices', (req, res) => {
//   apiProxy.web(req, res, { target: serverMortgage });
// });

// app.all('/homes/:home/detail-information', (req, res) => {
//   apiProxy.web(req, res, { target: serverDescription });
// });

// app.all('/homes/:home/nearbyhomes', (req, res) => {
//   apiProxy.web(req, res, { target: serverNearby });
// });

app.all('/homes/:home/images', (req, res) => {
  apiProxy.web(req, res, { target: serverImages });
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
