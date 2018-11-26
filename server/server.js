require('newrelic');
require('dotenv').config();
const express = require('express');
const httpProxy = require('http-proxy');

const port = process.env.PORT || 3000;

const apiProxy = httpProxy.createProxyServer();
// const serverMortgage = process.env.MORTGAGE;
// const serverDescription = process.env.DESCRIPTION;
// const serverNearby = process.env.NEARBY;
const serverImages = process.env.IMAGES;

const app = express();
app.use(express.static('./public'));

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
