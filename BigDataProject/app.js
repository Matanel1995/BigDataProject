const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const jsonFilePath = './BSC.json';
const BrightStar = require('../BigDataProject/models/BrightStar');


app.get('/', (req, res) => {
  var str = fs.readFileSync(jsonFilePath);
  var jstr = JSON.parse(str);


  // console.log(str);
  for( let i =0; i<50;i++){
    const new_Star = new BrightStar(jstr[i]['harvard_ref_#'],jstr[i].RA,jstr[i].DEC,jstr[i]['RA PM'],jstr[i]['DEC PM'],jstr[i].MAG,jstr[i]['Title HD']);
    const key = new_Star.RA+","+new_Star.RA
    const value = {harvard_ref:new_Star.harvard_ref,
                  RA: new_Star.RA,
                  RA_PM:new_Star.RA_PM,
                  DEC: new_Star.DEC,
                  DEC_PM: new_Star.DEC_PM,
                  MAG: new_Star.MAG,
                  TITLE: new_Star.Title_HD}
    console.log(key,value);
  }
  
  res.send(jstr[0]);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})