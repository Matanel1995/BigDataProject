const WebSocket = require('ws');

class wsConfig {
  constructor() {
    this.wss = new WebSocket.Server({ port: 8080 });
    this.connectedClients = new Set();
  }
  
  connect(){
    this.wss.on('connection', (ws) => {
        // Add the new client to the set of connected clients
        this.connectedClients.add(ws);
      
        // Remove the client from the set when the connection is closed
        ws.on('close', () => {
            this.connectedClients.delete(ws);
        });
      });
  }



  // ... Rest of the class methods
}








module.exports = wsConfig;