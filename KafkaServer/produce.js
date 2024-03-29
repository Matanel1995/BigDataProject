
const kafkaSingelton = require('./kafkaConfig')


const produceMsg = async (req,res)=>{
    let msg = req.body;
    const producer = kafkaSingelton.kafka.producer();
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
    res.send('success');
    await producer.disconnect();



}
module.exports = {
  produceMsg,
}