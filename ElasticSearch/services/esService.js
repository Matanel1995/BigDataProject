
const elsticSingelton = require('../elsticConfig')
const WebSocket = require('ws');

const wsConfig = require('../wsConfig')

const WsInstance = new wsConfig();

WsInstance.connect();






async function createIndex(indexName, key, value) {
    try {
      const keyNumber = +key;
      const response = await elsticSingelton.client.index({
        index: indexName,
        type: 'my-type',
        id: keyNumber,
        body: {
          key: keyNumber,
          value: value,
        }
      });
    } catch (error) {
      console.error('Error indexing document:', error);
    }
  }
  

const addToElastic =  async (req, res) => {
    try {
      let msg = req.body;
      const indexName = 'myindex5';
      const response = await createIndex(indexName, msg.key, msg.value);
      const urgenctNum = JSON.parse(msg.value).urgency
      // Notify connected clients about the new message
      WsInstance.connectedClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && urgenctNum>=3) {
          client.send(JSON.stringify({ type: 'newMessage' }));
        }
      });
  
      res.send({ data: "success" });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send("Error sending message.");
    }
  };

 const getEvents =  async (req, res) => {
    try {
      const val = req.query.range
      const sumsByUrgency = await calculateSums(val);
      
      // res.send({sumsByUrgency})
      res.status(200).json({ sumsByUrgency });
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
      res.status(500).json({ error: 'Error querying Elasticsearch' });
    }
  };

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
  
      const response = await elsticSingelton.client.search(query);
  
      // Process the results and calculate sums for each urgency level
      const sumsByUrgency = [0, 0, 0, 0, 0]; // Initialize sums array for each urgency level
  
      response.hits.hits.forEach((hit) => {
        const value = JSON.parse(hit._source.value);
        const currentTime = new Date();
        const timestampDate = new Date(value.time);
        const timeDifference = currentTime - hit._source.key;
        const twentyFourHoursInMilliseconds = 24 * 7 * 60 * 60 * 1000;
        const source = hit._source;
        const urgency = value.urgency;
        sumsByUrgency[urgency - 1]++;
      });
      const sumsByUrgencyl = sumsByUrgency.map((value, index) => ({
        name: (index + 1).toString(),
        value: value,
      }));
      return sumsByUrgencyl;
      
      
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
    }
  }

 const geteventsFull =  async (req, res) => {
    try {
      const val = req.query.range
      const events = await getFullEvents(val);
      
      // res.send({sumsByUrgency})
      res.status(200).json({ events });
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
      res.status(500).json({ error: 'Error querying Elasticsearch' });
    }
  };

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
  
      const response = await elsticSingelton.client.search(query);
  
      // Process the results and calculate sums for each urgency level
      const allEvents = []; // Initialize sums array for each urgency level
  
      response.hits.hits.forEach((hit) => {
        const value = JSON.parse(hit._source.value);
        allEvents.push(value)
      });
      return allEvents;
      
      
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
    }
  }

  const getLastEvent =  async (req, res) => {
    try {

      const lastdoc = await fetchDocumentWithMaxKey();
      // res.send({sumsByUrgency})
      res.status(200).json({ lastdoc });
    } catch (error) {
      console.error('Error querying Elasticsearch:', error);
      res.status(500).json({ error: 'Error querying Elasticsearch' });
    }
  };

  async function fetchDocumentWithMaxKey() {
    try {
      // Elasticsearch query
      const response = await elsticSingelton.client.search({
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
      return maxKeyDocument.value;
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  } 

  const getSearch =  async (req, res) => {
    try {
      const start = req.query.start // start date 
      const end = req.query.end  // end format
      const  eventType = req.query.event // Event type : commet/astroid
      const telescopName = req.query.telescopName

      const response = await search(start,end,eventType,telescopName);
      res.send({response})
    } catch (error) {
        console.log(error)
    }
  };

  async function search(start, end, event,telescopName){
    const query = {
      index: 'myindex5',
      body: {
        query: {
          bool: {
            must: [
              {
                range: {
                  "key": {
                    "gte": start,
                    "lte": end,
                  }
                }
              },
            ]
          }
        },
        size: 10000 // Increase this value if you have more than 10,000 documents
      }
    };
  
    // Add the match clause for "value" if the "event" parameter is defined
    if (event !== "") {
      query.body.query.bool.must.push({
        match: {
          "value": event
        }
      });
    }
    if(telescopName !== ""){
      query.body.query.bool.must.push({
        match: {
          "value": telescopName
        }
      });
    }


    const allAns = []
    const response = await elsticSingelton.client.search(query);
    response.hits.hits.forEach((hit) => {
      const value = JSON.parse(hit._source.value);
      allAns.push(value);
    });
    return allAns;
  }


  module.exports = {
    addToElastic,
    getEvents,
    geteventsFull,
    getLastEvent,
    getSearch,



};
