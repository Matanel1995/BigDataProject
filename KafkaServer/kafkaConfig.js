const { Kafka } = require('kafkajs');

class KafkaHandler {
  constructor() {
    if (KafkaHandler.instance) {
      return KafkaHandler.instance;
    }

    this.kafka = new Kafka({
        brokers: ['notable-rodent-11753-eu1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'Zmlyc3Qta2l3aS0xNDA0MyRLVlINL6jEXo3YZ-tDCsaQoH6CfRblLboZblplmO0',
          password: 'c7671703ebf64fb6893b768467f5d40c',
        },
        ssl: true,
      });
    KafkaHandler.instance = this;
  }

  // ... Rest of the class methods
}

// Singleton instance of KafkaHandler
const kafkaHandler = new KafkaHandler();

module.exports = kafkaHandler;
