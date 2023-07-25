// Card.js
import React from 'react';

const Card = ({ data }) => {
//   const parsedData = JSON.parse(data) 
const parsedData = data ? JSON.parse(data) : undefined;
console.log(parsedData?.time);
const urgencyColor = parsedData?.urgency > 4 ? 'red' : '';
    return (
    <div style={{color:'gray'}} className="card" >
        <h2>Last simulated event </h2>
      <p className="telescope-name">Telescope Name:  {parsedData?.telescopeName}</p>
      <p className="time">Time: {parsedData?.time}</p>
      <p className="coordinates">
        Coordinates: RA : {parsedData?.DEC_RA.ra}, DEC: {parsedData?.DEC_RA.dec}
      </p>
      <p className="event">Event: {parsedData?.event}</p>
      <p style={{color:urgencyColor}} className="urgency">Urgency: {parsedData?.urgency}</p>
    </div>
  );
};

export default Card;