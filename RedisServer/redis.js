const express = require('express');
// const fetch = require('node-fetch');

const app = express();
require('dotenv').config();


const  {Redis}  =  require("ioredis");


const client = new Redis("rediss://default:37451a4fb8804b3ca6ef5b829b416f6b@oriented-falcon-35428.upstash.io:35428");





// Fetch data from NasaAPI and store in Redis
// get link : http://localhost:5000/get?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}
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
  
  const data = await client.get(key)
  if (data == null){ // need to fetch the data and store it to redis.
    //Fetch from NasaApi
    console.log("should be here");
    const startTime = key.split(" ")[0]; 
    const endTime = key.split(" ")[1];
    const response = await fetch(`http://localhost:4000/feed?start_date=${startTime}&end_date=${endTime}`);
    const data = await response.json();
    console.log(data);
    const jsonData = JSON.stringify(data);
    console.log('######### JSON DATA #########');
    console.log(jsonData);
    //Set to redis
    await setRedis(key,jsonData);
    return jsonData
  }
  return data;
}

async function setRedis(key, value){
  console.log("IN SET REDIS FUNCTION");
  //Function to set data to redis

  const data = await client.set(key,value);
  console.log(data);
}



const port = 5000;
app.listen(port, () => {
  console.log(`Redis Server is running on port ${port}`);
});

// // console.log("test");
// getRedis('2023-05-20 2023-05-21').then((data)=>{console.log(JSON.stringify(data.result))});
// // setRedis('test','s');
// const a = process.env.REDIS_AUTH
// console.log(a)



