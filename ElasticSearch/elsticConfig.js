var  elasticsearch  = require('elasticsearch');

class elsticConfig {
  constructor(bonsai_url) {
    if (elsticConfig.instance) {
      return elsticConfig.instance;
    }
    var bonsai_url    = 'https://x9zur1yxtl:jka8ha38m8@bigdataproject-searc-5583828214.us-east-1.bonsaisearch.net:443';
     this.client   = new elasticsearch.Client(
        {
        host: bonsai_url,
        log: 'trace',                        
    });
    elsticConfig.instance = this;
  }

  // ... Rest of the class methods
}

// Singleton instance of KafkaHandler
const elsticConfigs = new elsticConfig()


module.exports = elsticConfigs;
