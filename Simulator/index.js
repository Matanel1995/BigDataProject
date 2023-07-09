const express = require('express');
const SunCalc = require('suncalc');
const axios = require('axios');
const app = express();
const cheerio = require('cheerio');
const telescopeData = require('./public/telescopeData');
console.log(telescopeData);
// Endpoint to generate the simulated data
function sendToKafka() {
  const simulatedData = generateSimulatedData();

  const receivingServerURL = `http://localhost:5000/?msg=${encodeURIComponent(simulatedData)}`;

  fetch(receivingServerURL)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Request failed');
      }
    })
    .then((data) => {
      console.log('Object sent successfully:', data);
    })
    .catch((error) => {
      console.error('Error sending object:', error);
    });
}
  
  setInterval(sendToKafka, 30000);



function calculateDecRA(place, time) {
  // Get the latitude and longitude of the place (assuming place is in the format "City, Country")
  const [latitude, longitude] = place.split(',').map(str => str.trim());
  console.log(latitude)

  // Parse the time string into a Date object
  const date = new Date(time);
  console.log(date);

  // Calculate the Sun's position using SunCalc library
  const sunPosition = SunCalc.getPosition(date, latitude, longitude);
  console.log(sunPosition)

  // Extract the Declination and Right Ascension from the Sun's position
  const dec = sunPosition.altitude;
  const ra = sunPosition.azimuth;

  // Return the calculated Dec and RA
  return {
    dec,
    ra
  };
}

function generateSimulatedData() {
  const simulatedData = [];
  const events = ['GRB', 'Rise Brightness Apparent', 'Rise U', 'Rise Ray-X', 'Comet'];
  const levelsOfUrgency = [1, 2, 3, 4, 5];

  const currentTime = new Date();
  const utcTime = currentTime.toISOString();
  const telescopeKeys = Object.keys(telescopeData);
  
  const randomIndex = Math.floor(Math.random() * telescopeKeys.length);
  const randomKey = telescopeKeys[randomIndex];
  console.log(randomKey,"keyyyyyyyyyyyyyy");
  const randomValue = telescopeData[randomKey];
  console.log(randomValue.LatLng,"valueeeeeeeeeee")
  const result = calculateDecRA(randomValue.LatLng, utcTime);
  // Generate simulated data 
    const data = {
      time: utcTime,
      telescopeName: randomKey,
      DEC_RA: result,
      event: events[Math.floor(Math.random() * events.length)],
      urgency: levelsOfUrgency[Math.floor(Math.random() * levelsOfUrgency.length)],
    };

  return data;
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
