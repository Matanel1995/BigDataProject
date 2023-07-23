const express = require('express');
const app = express();
app.use(express.json());

var bonsai_url    = 'https://x9zur1yxtl:jka8ha38m8@bigdataproject-searc-5583828214.us-east-1.bonsaisearch.net:443';
var elasticsearch = require('elasticsearch');
var client        = new elasticsearch.Client(
    {
    host: bonsai_url,
    log: 'trace',                        
});

async function createIndex(indexName, key, value) {
  try {
    const response = await client.index({
      index: indexName,
      type: 'my-type',
      id: key,
      body: {
        key: key,
        value: value,
      }
    });
    console.log('Document indexed successfully:', response);
  } catch (error) {
    console.error('Error indexing document:', error);
  }
}


// consume from Kafka
// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/ElasticPart', async (req) => {
    try {
      let msg = req.body
      const indexName = 'myindex4';
      const response = await createIndex(indexName, msg.key, msg.value);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send("Error sending message.");
    }
  });