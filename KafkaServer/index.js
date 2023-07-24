const {produceMsg} = require("./produce");

const express = require('express');
const app = express();
app.use(express.json());
const consume = require('./consume');


consume();
app.post('/',produceMsg);


const port = 5000;
app.listen(port, () => {
  console.log(`Kafka Server is running on port ${port}`);
});