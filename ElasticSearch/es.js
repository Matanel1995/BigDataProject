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
      console.log(val)
      const sumsByUrgency = await calculateSums(val);
      
      // res.send({sumsByUrgency})
      res.status(200).json({ sumsByUrgency });
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
      res.status(500).json({ error: 'Error querying Elasticsearch' });
    }
  });

  app.get('/geteventsFull', async (req, res) => {
    try {
      const val = req.query.range
      console.log(val)
      const events = await getFullEvents(val);
      
      // res.send({sumsByUrgency})
      res.status(200).json({ events });
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
      res.status(500).json({ error: 'Error querying Elasticsearch' });
    }
  });

  app.get('/getLastEvent', async (req, res) => {
    try {

      const lastdoc = await fetchDocumentWithMaxKey();
      // res.send({sumsByUrgency})
      res.status(200).json({ lastdoc });
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
      res.status(500).json({ error: 'Error querying Elasticsearch' });
    }
  });

  

  
  
  async function fetchDocumentWithMaxKey() {
    try {
      // Elasticsearch query
      const response = await client.search({
        index: 'myindex5', // Replace with your index name
        size: 1,
        body: {
          query: {
            match_all: {},
          },
          sort: [
            {
              key: {
                order: 'desc',
              },
            },
          ],
        },
      });
  
      // Extract the relevant document from the Elasticsearch response
      const maxKeyDocument = response.hits.hits[0]._source;
  
      // Return the document with the maximum key value
      console.log(maxKeyDocument.value)
      return maxKeyDocument.value;
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  } 

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
      // console.log(response)
  
      // Process the results and calculate sums for each urgency level
      const sumsByUrgency = [0, 0, 0, 0, 0]; // Initialize sums array for each urgency level
  
      response.hits.hits.forEach((hit) => {
        const value = JSON.parse(hit._source.value);
        const currentTime = new Date();
        const timestampDate = new Date(value.time);
        const timeDifference = currentTime - hit._source.key;
        const twentyFourHoursInMilliseconds = 24 * 7 * 60 * 60 * 1000;
        // console.log(typeof hit._source.key,hit._source.key)
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

  async function getFullEvents(val) {
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
      // console.log(response)
  
      // Process the results and calculate sums for each urgency level
      const allEvents = []; // Initialize sums array for each urgency level
  
      response.hits.hits.forEach((hit) => {
        const value = JSON.parse(hit._source.value);
        allEvents.push(value)
      });
      console.log('Sums by Urgency within the last 24 hours:', allEvents);
      return allEvents;
      
      
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
    }
  }

async function d(){
  const end = Date.now() 
  const start = Date.now() - 24 *7* 60 * 60 * 1000;



  const query = {
    index: 'myindex5',
    body: {
      query: {
        nested: {
          path: 'value',
          query: {
            term: {
              'value.event': 'Comet'
            }
          }
        }
      },
      size: 10000 // Increase this value if you have more than 10,000 documents
    }
  };

  const response = await client.search(query);
  // console.log(response)

  // Process the results and calculate sums for each urgency level
  const allEvents = []; // Initialize sums array for each urgency level

  response.hits.hits.forEach((hit) => {
    const value = JSON.parse(hit._source.value);
    console.log('dsadsadasdsadasd')
  });
}





  // calculateSums();