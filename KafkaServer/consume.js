const kafkaSingelton = require('./kafkaConfig')


const fetchData = async (currMsg)=>{

            console.log('hererererererererer')
            const res = await fetch("http://localhost:8000/ElasticPart", {
            method: "POST", 
            headers: { Accept: "application/json" , "Content-Type": "application/json"},
            body: JSON.stringify(currMsg)})
    
    
    }


const consume = async () =>{
    // take the message to Elastic Search

    const consumer = kafkaSingelton.kafka.consumer({ groupId: 'a' })
    consumer.connect()
    console.log('Consumer connected');
    await consumer.subscribe({ topic: 'telescopes', fromBeginning: true });
    console.log('Consumer subscribed to topic: telescopes');
    consumer.run({
        eachBatchAutoResolve: false,
        eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
            for (let message of batch.messages) {
                if (!isRunning() || isStale()) break
                let currMsg = {
                    key : message.key.toString(),
                    value : message.value.toString()
                  };
                await fetchData(currMsg)
                resolveOffset(message.offset)
                await heartbeat()
            }
        }
    })
  }

  module.exports = consume;