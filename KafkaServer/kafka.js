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
})
console.log("before");
app.get('/', async (req, res) => {
    console.log("test")

});
console.log("after"); 
const producer = kafka.producer()
producer.connect()
// ...
producer.disconnect()
 
const consumer = kafka.consumer({ groupId: '$GROUP_NAME' })
consumer.connect()
// ...
consumer.disconnect()

const port = 6000;
app.listen(port, () => {
  console.log(`Kafka Server is running on port ${port}`);
});