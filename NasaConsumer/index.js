const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());



//GET SPECIFIC ASTEROID BY ID
//get link should look like this : http://localhost:4000/astroid?asteroid_id={#ASTROID_ID}
app.get('/astroid', async (req, res) => {
  try {
    const apiUrl = "https://api.nasa.gov/neo/rest/v1/neo/";
    const asteroid_id = req.query.asteroid_id; // Retrieve start date from query parameter
    const apiKey = "DEMO_KEY";

    console.log(asteroid_id);
    const requestUrl = `${apiUrl}${asteroid_id}?api_key=${apiKey}`;
    console.log(requestUrl);

    const response = await fetch(requestUrl);
    const data = await response.json();

    res.status(200).json(data); // Return the data as a response

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//GET THE FEED BETWEEN DATES
//get link should look like this : http://localhost:4000/feed?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}
app.get('/feed', async (req, res) => {
    try {
      const apiUrl = "https://api.nasa.gov/neo/rest/v1/feed";
      const startDate = req.query.start_date; // Retrieve start date from query parameter
      const endDate = req.query.end_date; // Retrieve end date from query parameter
      const apiKey = "DEMO_KEY";
  
      const requestUrl = `${apiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  
      const response = await fetch(requestUrl);
      const data = await response.json();
  
      res.status(200).json(data); // Return the data as a response
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


//GET ALL DATA
//get link : http://localhost:4000/all
app.get('/all', async (req, res) => {
    try {
      const apiUrl = "https://api.nasa.gov/neo/rest/v1/neo/browse/";
      const apiKey = "DEMO_KEY";
  
      const requestUrl = `${apiUrl}?&api_key=${apiKey}`;
  
      const response = await fetch(requestUrl);
      const data = await response.json();
  
  
      res.status(200).json(data); // Return the data as a response
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//GET THE FEED IN LAST 24H
//get link should look like this : http://localhost:4000/Last24
app.get('/Last24', async (req, res) => {
  try {
    const apiUrl = "https://ssd-api.jpl.nasa.gov/cad.api";

    // Calculate the start date as the current date minus 1 day
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const requestUrl = `${apiUrl}?date-min=${formattedStartDate}&date-max=${formattedEndDate}`;

    const response = await fetch(requestUrl);
    const data = await response.json();

    res.status(200).json(data); // Return the data as a response

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Function to format the date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
