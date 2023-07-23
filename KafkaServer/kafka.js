const express = require('express');
const app = express();
app.use(express.json());
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

app.post('/', async (req,res) => {
  try {
    let msg = req.body;
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
  let timestamp = Date.now().toString();
  let message = {
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

  const msgPromise = new Promise(async(resolve, reject) => {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // console.log('TOPIC ' , topic);
        // console.log('PARTITION ',partition);
        // console.log('MESSAGE' , message.key.toString() , message.value.toString());
        let currMsg = {
          key : message.key.toString(),
          value : message.value.toString()
        };
        resolve(currMsg);
        // const res = await fetch("http://localhost:8000/ElasticPart", {
        //   method: "POST", 
        //   headers: { Accept: "application/json" , "Content-Type": "application/json"},
        //   body: JSON.stringify(currMsg)}).then(s => {
        //     consumer.commitOffsets([{ topic:'telescopes', partition : 0, offset: message.offset }]).then(r => {
        //     });
        //   });
      }
  })})
   const msg2 = await msgPromise;
   console.log(msg2);
     const res = await fetch("http://localhost:8000/ElasticPart", {
          method: "POST", 
          headers: { Accept: "application/json" , "Content-Type": "application/json"},
          body: JSON.stringify(msg2)});
   consumer.disconnect();
  // const res = await fetch("http://localhost:8000/ElasticPart", {
  //         method: "POST", 
  //         headers: { Accept: "application/json" , "Content-Type": "application/json"},
  //         body: JSON.stringify(msg2)});
  // await consumer.run({
  //   autoCommitInterval: 5000,
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log('TOPIC ' , topic);
  //     console.log('PARTITION ',partition);
  //     console.log('MESSAGE' , message.key.toString() , message.value.toString());
  //     let currMsg = {
  //       key : message.key.toString(),
  //       value : message.value.toString()
  //     };
  //     // const res = await fetch("http://localhost:8000/ElasticPart", {
  //     //   method: "POST", 
  //     //   headers: { Accept: "application/json" , "Content-Type": "application/json"},
  //     //   body: JSON.stringify(currMsg)}).then(s => {
  //     //     consumer.commitOffsets([{ topic:'telescopes', partition : 0, offset: message.offset }]).then(r => {
  //     //     });
  //     //   });
  //   }
  // });

  // async function sendOneMessage(){
  //   await consumer.run({
  //     autoCommitInterval: 5000,
  //     eachMessage: async ({ topic, partition, message }) => {
  //       console.log('TOPIC ' , topic);
  //       console.log('PARTITION ',partition);
  //       console.log('MESSAGE' , message.key.toString() , message.value.toString());
  //       let currMsg = {
  //         key : message.key.toString(),
  //         value : message.value.toString()
  //       };
  //       const res = await fetch("http://localhost:8000/ElasticPart", {
  //         method: "POST", 
  //         headers: { Accept: "application/json" , "Content-Type": "application/json"},
  //         body: JSON.stringify(currMsg)}).then(s => {
  //           consumer.commitOffsets([{ topic:'telescopes', partition : 0, offset: message.offset }]).then(r => {
  //           });
  //         });
  //     }
  //   });
  // }

  // consumer.disconnect();
}

const port = 5000;
app.listen(port, () => {
  console.log(`Kafka Server is running on port ${port}`);
});