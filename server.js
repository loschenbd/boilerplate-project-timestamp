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
  // Set url input variable
  let input = req.params.input;

  if(input.includes('-')){
    resObj['unix'] = new Date(input).getTime();
    resObj['utc'] = new Date(input).toUTCString();
  } else {
    // Declare Time as a number instead of string
    input = parseInt(input);
    // generate the correct UNIX and UTC data in json form.
    resObj['unix'] = new Date(input).getTime();
    resObj['utc'] = new Date(input).toUTCString();
  }
  //  error handler for incorrect input
  if (!resObj['unix'] || !resObj['utc']){
    res.json({error: 'Invalid Date'});
  }
  // return object
  res.json(resObj)
});

// Get current time at [project_url]/api/timestamp/
app.get('/api/timestamp', (req, res) => {
  // generate the correct UNIX and UTC data in json form.
  resObj['unix'] = new Date().getTime();
  resObj['utc'] = new Date().toUTCString();
  // return object
  res.json(resObj)
});