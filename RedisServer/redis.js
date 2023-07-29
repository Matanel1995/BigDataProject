const express = require('express');
// const fetch = require('node-fetch');

const app = express();
const fs = require('fs');
const jsonFilePath = './BSC.json';
const BrightStar = require('./BrightStar');


const  {Redis}  =  require("ioredis");


const client = new Redis("redis://redis:6379");

//Sending randomkey for simalutor to make the dec,ra
app.get('/getRandomKey',async (req,res)=>{
  const randomKey = await client.randomkey();
  console.log(randomKey)
  if (randomKey){
    res.send(randomKey);
}})

app.get('/',async (req,res)=>{
 res.send("here it ok")
  console.log(randomKey)
})



async function setRedis(key, value){
  console.log("IN SET REDIS FUNCTION");
  //Function to set data to redis

  const data = await client.set(key,value);
  console.log(data);
}



const port = 9000;
app.listen(port, () => {
  console.log(`Redis Server is running on port ${port}`);
});



// var str = fs.readFileSync(jsonFilePath);
// var jstr = JSON.parse(str);
// console.log(jstr.length)
// for( let i =0; i<jstr.length ;i++){
//   const new_Star = new BrightStar(jstr[i]['harvard_ref_#'],jstr[i].RA,jstr[i].DEC,jstr[i]['RA PM'],jstr[i]['DEC PM'],jstr[i].MAG,jstr[i]['Title HD']);
//   const key = new_Star.RA+","+new_Star.DEC
//   const value = {harvard_ref:new_Star.harvard_ref,
//                 RA: new_Star.RA,
//                 RA_PM:new_Star.RA_PM,
//                 DEC: new_Star.DEC,
//                 DEC_PM: new_Star.DEC_PM,
//                 MAG: new_Star.MAG,
//                 TITLE: new_Star.Title_HD};
// setRedis(key,JSON.stringify(value));
// console.log(key,value)
// }
// console.log("test");
// getRedis('2023-05-20 2023-05-21').then((data)=>{console.log(JSON.stringify(data.result))});
// setRedis('test','s');
// const a = process.env.REDIS_AUTH
// console.log(a)