const express = require('express');
const fetch = require('node-fetch');

const app = express();


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

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
