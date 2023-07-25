const express = require('express');
// const fetch = require('node-fetch');

const app = express();
require('dotenv').config();
const fs = require('fs');
const jsonFilePath = './BSC.json';
const BrightStar = require('../RedisServer/BrightStar');


const  {Redis}  =  require("ioredis");


const client = new Redis("rediss://default:7633e4c4e7734629982f0d55c520153c@healthy-cicada-36635.upstash.io:36635");
//Sending randomkey for simalutor to make the dec,ra
app.get('/getRandomKey',async (req,res)=>{
  const randomKey = await client.randomkey();
  console.log(randomKey)
  if (randomKey){
    res.send(randomKey);
}})



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



var str = fs.readFileSync(jsonFilePath);
var jstr = JSON.parse(str);
console.log(jstr.length)
for( let i =10; i<100;i++){
  const new_Star = new BrightStar(jstr[i]['harvard_ref_#'],jstr[i].RA,jstr[i].DEC,jstr[i]['RA PM'],jstr[i]['DEC PM'],jstr[i].MAG,jstr[i]['Title HD']);
  const key = new_Star.RA+","+new_Star.DEC
  const value = {harvard_ref:new_Star.harvard_ref,
                RA: new_Star.RA,
                RA_PM:new_Star.RA_PM,
                DEC: new_Star.DEC,
                DEC_PM: new_Star.DEC_PM,
                MAG: new_Star.MAG,
                TITLE: new_Star.Title_HD};
setRedis(key,JSON.stringify(value));
// console.log(key,value)
}
// // console.log("test");
// getRedis('2023-05-20 2023-05-21').then((data)=>{console.log(JSON.stringify(data.result))});
// // setRedis('test','s');
// const a = process.env.REDIS_AUTH
// console.log(a)



