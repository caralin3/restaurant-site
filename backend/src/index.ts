const express = require('express');
const bodyParser = require('body-parser');
const mailer = require('./mailer.ts');

const app = express().use(bodyParser.json());
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( '/', ( req, res ) => {
  res.send('Hello world!');
});

app.get('/api/submission/contact', (req, res) => mailer.mailer(req, res));

app.post('/api/submission/contact', (req, res) => mailer.mailer(req, res));

// start the Express server
app.listen( port, () => {
  console.log( `Server started at port ${ port }` );
});