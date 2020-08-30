// server.js
// where your node app starts
'use strict'
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening @ http://localhost:' + listener.address().port);
});

//Set empty array for inputs.
let resObj = {};
// Create url for collecting the input.
app.get('/api/timestamp/:input', (req, res) => {
  // Set variable url input variable
  let input = req.params.input;

  if(input.includes('-')){
    resObj['unix'] = new Date(input).getTime();
    resObj['utc'] = new Date(input).toUTCString();
  } else {
    // Declare Time
    input = parseInt(input);
    resObj['unix'] = new Date(input).getTime();
    resObj['utc'] = new Date(input).toUTCString();
  }

  if (!resObj['unix'] || !resObj['utc']){
    res.json({error: 'Invalid Date'});
  }
  res.json(resObj)
});

app.get('/api/timestamp', (req, res) => {
  resObj['unix'] = new Date().getTime();
  resObj['utc'] = new Date().toUTCString();
  res.json(resObj)
});