const express = require('express');
const app = express();

const { Kafka } = require('kafkajs')


const kafka = new Kafka({
  brokers: ['notable-rodent-11753-eu1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'bm90YWJsZS1yb2RlbnQtMTE3NTMkQ_ab1LsDLmBHIVjX62e8LfS1YJACIPcE_kM',
    password: '407951382fad4af1a5f770522f35f36e',
  },
  ssl: true,
});

app.get('/', async (req, res) => {
  try {
    const receivedData = req.query.msg;
    console.log("b")
    console.log(receivedData)
    // let good_msg = JSON.stringify(msg)
    await sendMessage(msg);
    console.log("c")
    res.send("Message sent successfully.");
    console.log("d")

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send("Error sending message.");
  }
});


async function sendMessage(msg) {
  console.log("in SENDMESSAGE");
  const producer = kafka.producer();

  await producer.connect();

  const topic = 'telescopes';
  const response = msg;
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