const kafkaSingelton = require('./kafkaConfig')
const axios = require('axios')



const consume = async () =>{
    // take the message to Elastic Search

    const consumer = kafkaSingelton.kafka.consumer({ groupId: 'a' })
    consumer.connect()
    console.log('Consumer connected');
    await consumer.subscribe({ topic: 'telescopes', fromBeginning: true });
    console.log('Consumer subscribed to topic: telescopes');
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          let currMsg = {
            key : message.key.toString(),
            value : message.value.toString()
          };
          console.log(currMsg)
          try {
            const url = "http://localhost:8000/ElasticPart";
            console.log("i was here")
        
            // Send a POST request using Axios
            const response = await axios.post(url, currMsg, {
              headers: { Accept: "application/json", "Content-Type": "application/json" },
            });
            console.log("i wasnt here")
        
            // Handle the response data here if needed
            console.log("Response:", response.data);
          } catch (error) {
            console.error("Error posting data:", error);
          }
        }
    })
  }

  module.exports = consume;