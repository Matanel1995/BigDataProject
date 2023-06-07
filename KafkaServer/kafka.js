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
}

const port = 5000;
app.listen(port, () => {
  console.log(`Kafka Server is running on port ${port}`);
});
