const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

const serviceAUrl = 'http://localhost:8001';
const serviceBUrl = 'http://localhost:8002';

app.use('/api/data', (req, res) => {
  console.log(`Incoming request to /api/data: ${req.method} ${req.url} `);
  proxy.web(req, res, { target: serviceAUrl }, (err) => {
  console.error(`Error forwarding request to service A: ${err.message}`);
  res.status(500).send('Internal Server Error');  
 });
});
  
app.use('/api/info', (req, res) => { 
  console.log(`Incoming request to /api/info: ${req.method} ${req.url} `);
  proxy.web(req, res, { target: serviceBUrl }, (err) => {
  console.error(`Error forwarding request to service B: ${err.message} `);
  res.status(500).send('Internal Server Error');
  });
});
  
  // Add this middleware to log the request received by the proxy 
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  console.log(`Received request to ${options.target.href}: ${req.method} ${req.url} `);
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  console.log(
    'proxyRes ←',
    proxyRes.statusCode,
    req.method,
    req.url,
    'from', proxyRes.headers['content-type']
  );
});


proxy.on('error', (err, req, res) => {
  console.error('proxy error', err.stack || err.message);
  if (!res.headersSent) {
    res.status(502).send('Bad gateway');
  } else {
    res.end();                // connection already started
  }
});
  
const port = 8000;
  app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}` );
});