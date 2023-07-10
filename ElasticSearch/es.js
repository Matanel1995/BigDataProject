const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var bonsai_url    = 'https://x9zur1yxtl:jka8ha38m8@bigdataproject-searc-5583828214.us-east-1.bonsaisearch.net:443';
var elasticsearch = require('elasticsearch');
var client        = new elasticsearch.Client(
    {
    host: bonsai_url,
    log: 'trace',                        
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test the connection:
// Send a HEAD request to "/" and allow
// up to 30 seconds for it to complete.
client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

async function createIndex(indexName , key,value){
    const response = await client.index({
        index: indexName,
        type: 'my-type',
        id: key,
        body: {
            key: key,
            value: value,
        }
    })
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
      console.log(msg);
      const indexName = 'myindex';
      let key = msg.key;
      let value = msg.value;
      createIndex(indexName,key,value);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send("Error sending message.");
    }
  });

