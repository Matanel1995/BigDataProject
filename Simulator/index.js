const express = require('express');
const app = express();
const telescopeData = require('./public/telescopeData');

async function sendToKafka(){
const simulatedData = await generateSimulatedData();
try {
  const res = await fetch("http://localhost:5000/", {
    method: "POST", 
    headers: { Accept: "application/json" , "Content-Type": "application/json"},
    body: JSON.stringify(simulatedData)
  });
  } catch (error) {
    console.log("im error ", error);
  }
}
// sendToKafka();
setInterval(sendToKafka, 20000);

async function calculateDecRA() {
  
  try{
  const response = await fetch(`http://localhost:9000/getRandomKey`);
  if(response.ok){
    const randKey = await response.text();
    const splited = randKey.split(',')
    const dec = splited[0];
    const ra = splited[1];
    return {
      dec,
      ra
    };
  } else {
    console.error('Error: Fetch request failed with status', response.status);
  }
} catch (error) {
  console.error('Error during fetch:', error);
}
}

async function generateSimulatedData() {
  const events = ['GRB', 'Rise Brightness Apparent', 'Rise U', 'Rise Ray-X', 'Comet'];
  const levelsOfUrgency = [1, 2, 3, 4, 5];

  const currentTime = new Date();
  const utcTime = currentTime.toISOString();
  const telescopeKeys = Object.keys(telescopeData);
  
  const randomIndex = Math.floor(Math.random() * telescopeKeys.length);
  const randomKey = telescopeKeys[randomIndex];
  const result = await calculateDecRA();
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
const port = 2000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
