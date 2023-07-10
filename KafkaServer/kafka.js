const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: ['notable-rodent-11753-eu1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'Zmlyc3Qta2l3aS0xNDA0MyRLVlINL6jEXo3YZ-tDCsaQoH6CfRblLboZblplmO0',
    password: 'c7671703ebf64fb6893b768467f5d40c',
  },
  ssl: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req) => {
  try {
    let msg = req.body
    await sendMessage(msg);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send("Error sending message.");
  }
});


async function sendMessage(msg) {
  const producer = kafka.producer();
  await producer.connect();
  const topic = 'telescopes';
  const timestamp = Date.now().toString();
  const message = {
    key: timestamp,
    value: JSON.stringify(msg),
  };

  await producer.send({
    topic,
    messages: [message],
  });

  await producer.disconnect();

  // take the message to Elastic Search
  const consumer = kafka.consumer({ groupId: 'a' })
  consumer.connect()
  console.log('Consumer connected');
  await consumer.subscribe({ topic: 'telescopes', fromBeginning: true });
  console.log('Consumer subscribed to topic: telescopes');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log("I GOT HERE");
        let key = message.key.toString();
        let value = message.value.toString();
        console.log("I GOT HERE2");
        let currMsg = {
          key: key,
          value: value
        };
        console.log("I GOT HERE3");
        const res = await fetch("http://localhost:8000/ElasticPart", {
        method: "POST", 
        headers: { Accept: "application/json" , "Content-Type": "application/json"},
        body: JSON.stringify(currMsg)});
        console.log("I GOT HERE4");
        console.log(`Received message: Topic: ${topic}, Partition: ${partition}, Key: ${key}, Value: ${value}`);
        // Process the received message
      } catch (error) {
        console.error('Error processing message:', error);
      }
    }
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));  

  consumer.disconnect()
}

const port = 5000;
app.listen(port, () => {
  console.log(`Kafka Server is running on port ${port}`);
});
