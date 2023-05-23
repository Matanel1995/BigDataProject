const express = require('express');
// const fetch = require('node-fetch');

const app = express();




//Fetch data from NasaAPI and store in Redis
//get link : http://localhost:5000/get?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}
app.get('/get', async (req, res) => {
  try {
    //Fetch the data fron NasaApi
    const startDate = req.query.start_date; // Retrieve start date from query parameter
    const endDate = req.query.end_date; // Retrieve end date from query parameter
    
    const key = startDate.toString() + " " + endDate.toString();

    console.log(key);

    const response = await getRedis(key);

    res.status(200).json(response); // Return the data as a response

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




async function getRedis(key){
  //Function to get data from redis
  const response = await fetch(`https://us1-ample-lacewing-40351.upstash.io/get/${key}`, {
  headers: {
    Authorization: "Bearer AZ2fASQgNWFkYzk2ZWQtZTgxZC00MDdiLWExZWItNzEwYjQ5ZGZhZTkzZWIxZjNmZDY1MGMwNDc5NWFiYjBmNWZkMDNlNTZkOWI="
    }
  });
  const data = await response.json();
  if (data.result == null){ // need to fetch the data and store it to redis.
    //Fetch from NasaApi
    console.log("should be here");
    const startTime = key.split(" ")[0]; 
    const endTime = key.split(" ")[1];
    const data = await fetch(`http://localhost:4000/feed?start_date=${startTime}&end_date=${endTime}`);
    //Set to redis
    await setRedis(key,data);
  }
  return data;
}

async function setRedis(key, value){
  console.log("IN SET REDIS FUNCTION");
  //Function to set data to redis
  const response = await fetch(`https://us1-ample-lacewing-40351.upstash.io/set/${key}/${value}`, {
  headers: {
    Authorization: "Bearer AZ2fASQgNWFkYzk2ZWQtZTgxZC00MDdiLWExZWItNzEwYjQ5ZGZhZTkzZWIxZjNmZDY1MGMwNDc5NWFiYjBmNWZkMDNlNTZkOWI="
    }
  });
  const data = await response.json();
  console.log(data);
}



const port = 5000;
app.listen(port, () => {
  console.log(`Redis Server is running on port ${port}`);
});



