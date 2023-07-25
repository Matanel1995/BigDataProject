const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')

app.use(cors());
var bonsai_url    = 'https://x9zur1yxtl:jka8ha38m8@bigdataproject-searc-5583828214.us-east-1.bonsaisearch.net:443';
var elasticsearch = require('elasticsearch');
var client        = new elasticsearch.Client(
    {
    host: bonsai_url,
    log: 'trace',                        
});

async function createIndex(indexName, key, value) {
  try {
    const keyNumber = +key;
    const response = await client.index({
      index: indexName,
      type: 'my-type',
      id: keyNumber,
      body: {
        key: keyNumber,
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

app.post('/ElasticPart', async (req, res) => {
    try {
      let msg = req.body
      const indexName = 'myindex5';
      const response = await createIndex(indexName, msg.key, msg.value);
      res.send({data: "success"});
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send("Error sending message.");
    }
  });

  app.get('/getevents', async (req, res) => {
    try {
      const val = req.query.range
      const sumsByUrgency = await calculateSums(val);
      
      // res.send({sumsByUrgency})
      res.status(200).json({ sumsByUrgency });
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
      res.status(500).json({ error: 'Error querying Elasticsearch' });
    }
  });
  


  async function calculateSums(val) {
    try {
      const indexName = 'myindex5';
  
      // Calculate the timestamp for 24 hours ago from the current time
      const twentyFourHoursAgoTimestamp = Date.now() - 24 *val* 60 * 60 * 1000;


      // Define the Elasticsearch query with a range filter to get documents within the last 24 hours
      const query = {
        index: indexName,
        body: {
          query: {
            range: {
              "key": {
                "gte": twentyFourHoursAgoTimestamp,
                
               
              }
            }
          },
          size: 10000 // Increase this value if you have more than 10,000 documents
        }
      };
  
      const response = await client.search(query);
      console.log(response)
  
      // Process the results and calculate sums for each urgency level
      const sumsByUrgency = [0, 0, 0, 0, 0]; // Initialize sums array for each urgency level
  
      response.hits.hits.forEach((hit) => {
        const value = JSON.parse(hit._source.value);
        const currentTime = new Date();
        const timestampDate = new Date(value.time);
        const timeDifference = currentTime - hit._source.key;
        const twentyFourHoursInMilliseconds = 24 * 7 * 60 * 60 * 1000;
        console.log(typeof hit._source.key,hit._source.key)
        const source = hit._source;
        const urgency = value.urgency;
        sumsByUrgency[urgency - 1]++;
      });
      const sumsByUrgencyl = sumsByUrgency.map((value, index) => ({
        name: (index + 1).toString(),
        value: value,
      }));
      console.log('Sums by Urgency within the last 24 hours:', sumsByUrgencyl);
      return sumsByUrgencyl;
      
      
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
    }
  }

  // calculateSums();