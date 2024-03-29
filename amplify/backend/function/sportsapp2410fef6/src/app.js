/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/stats', async function(req, res) {
  // Add your code here
  const nhlApiUrl = 'https://api-web.nhle.com/v1/roster/NYI/current';
  try {
    // Use Axios to make the HTTP request
    const response = await axios.get(nhlApiUrl);
    console.log("RESPONSE", response);
    // Set content type based on the Axios response
    res.setHeader('Content-Type', 'application/json');
    // Send the response data as JSON
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error fetching NHL data:', error);
    // Determine the status code based on the error if possible
    const statusCode = error.response ? error.response.status : 500;
    res.status(statusCode).json({ success: false, message: 'Failed to fetch data' });
  }
});

app.get('/stats/team', async function(req, res) {
  // Add your code here
  const nhlApiUrl = 'https://api-web.nhle.com/v1/club-stats/NYI/now';
  try {
    // Use Axios to make the HTTP request
    const response = await axios.get(nhlApiUrl);
    console.log("RESPONSE", response);
    // Set content type based on the Axios response
    res.setHeader('Content-Type', 'application/json');
    // Send the response data as JSON
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error fetching NHL data:', error);
    // Determine the status code based on the error if possible
    const statusCode = error.response ? error.response.status : 500;
    res.status(statusCode).json({ success: false, message: 'Failed to fetch data' });
  }
});

app.get('/stats/schedule', async function(req, res) {
  const nhlApiUrl = 'https://api-web.nhle.com/v1/club-schedule-season/NYI/20232024';
  try {
    // Use Axios to make the HTTP request
    const response = await axios.get(nhlApiUrl);
    console.log("RESPONSE", response);
    // Set content type based on the Axios response
    res.setHeader('Content-Type', 'application/json');
    // Send the response data as JSON
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error fetching NHL data:', error);
    // Determine the status code based on the error if possible
    const statusCode = error.response ? error.response.status : 500;
    res.status(statusCode).json({ success: false, message: 'Failed to fetch data' });
  }
});

/****************************
* Example post method *
****************************/

app.post('/stats', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/stats/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/stats', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/stats/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/stats', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/stats/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
