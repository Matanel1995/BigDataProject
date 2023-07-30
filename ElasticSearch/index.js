const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());
app.use(express.json());

const esController = require('./controllers/esController');
app.use(esController);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
