import React, { useEffect, useState } from 'react';
import Card from './Card';
import './Card.css';

const WebSocketComponent = ({ data }) => {
  const [showRedCircle, setShowRedCircle] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    // WebSocket onmessage event
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      console.log('WebSocket message received telescopeName:', data.telescopeName);
      if (data && data.type === 'newMessage') {
        // Set the state to show the red circle
        console.log('New message received. Setting showRedCircle to true.');
        setNewMessageCount(prevCount => prevCount + 1);
        setShowRedCircle(true);
        
      }
    };

    // WebSocket onclose event
    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // WebSocket onerror event
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const handleRedButtonClick = () => {
    setShowRedCircle(false);
    setNewMessageCount(0); // Reset the counter when the button is clicked
  };

  console.log('showRedCircle in WebSocketComponent:', showRedCircle);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        {showRedCircle && (
          <button
            className="red-circle-button"
            onClick={handleRedButtonClick}
            style={{ top: '10px', right: '10px' }} // Adjust the top and right properties for spacing
          >
            {newMessageCount}
          </button>
        )}
        <Card data={data} style={{ marginTop: '20px' }} /> {/* Add margin to create space between the button and the card */}
      </div>
    </div>
  );
  
};

export default WebSocketComponent;
