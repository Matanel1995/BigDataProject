// Card.js
import React from 'react';

const cardStyle = {
  color: 'white',
  padding: '35px 0 0 0', // Add 20px padding from the top
};
const Card = ({ data }) => {
  //   const parsedData = JSON.parse(data) 
  const parsedData = data ? JSON.parse(data) : undefined;
  console.log(parsedData?.time);
  const urgencyColor = parsedData?.urgency > 4 ? 'red' : '';
  return (
    <div style={cardStyle} className="card" >
      <h2>Last simulated event </h2>
<p className="telescope-name">Telescope Name:  {parsedData?.telescopeName}</p>
<p className="time">Time: {parsedData?.time}</p>
<p className="coordinates">
  Coordinates: RA : {parsedData?.DEC_RA?.ra}, DEC: {parsedData?.DEC_RA?.dec}
</p>
<p className="event">Event: {parsedData?.event}</p>
<p style={{ color: urgencyColor }} className="urgency">Urgency: {parsedData?.urgency}</p>
    </div>
  );
};

export default Card;









// import React from 'react';
// import './Card.css'; // Import the CSS file for styling

// const Card = ({ data, showRedCircle }) => {
//   console.log('showRedCircle in Card:', showRedCircle); // Add this line
//   const parsedData = data ? JSON.parse(data) : undefined;
//   console.log(parsedData?.time);
//   const urgencyColor = parsedData?.urgency > 4 ? 'red' : '';

//   return (
//     <div style={{ color: 'gray', position: 'relative' }} className="card">
//       {/* Conditionally render the red circle based on the showRedCircle prop */}
//       {showRedCircle && <div className="red-circle" />}
//       <h2>Last simulated event</h2>
//       <p className="telescope-name">Telescope Name:  {parsedData?.telescopeName}</p>
//       <p className="time">Time: {parsedData?.time}</p>
//       <p className="coordinates">
//         Coordinates: RA : {parsedData?.DEC_RA?.ra}, DEC: {parsedData?.DEC_RA?.dec}
//       </p>
//       <p className="event">Event: {parsedData?.event}</p>
//       <p style={{ color: urgencyColor }} className="urgency">Urgency: {parsedData?.urgency}</p>
//     </div>
//   );
// };

// export default Card;




// import React from 'react';
// import './Card.css'; // Import the CSS file for styling
// import './CircleButton.css'; 
// import { Link } from 'react-router-dom';

// const Card = ({ data, showRedCircle }) => {
//   console.log('showRedCircle in Card:', showRedCircle); // Add this line
//   const parsedData = data ? JSON.parse(data) : undefined;
//   console.log(parsedData?.time);
//   const urgencyColor = parsedData?.urgency > 4 ? 'red' : '';

//   return (
//     <div style={{ color: 'gray', position: 'relative' }} className="card">
//       {/* Conditionally render the red circle based on the showRedCircle prop */}
//       {showRedCircle && <button className="red-circle-button"></button>}
//       <h2>Last simulated event</h2>
//       <p className="telescope-name">Telescope Name:  {parsedData?.telescopeName}</p>
//       <p className="time">Time: {parsedData?.time}</p>
//       <p className="coordinates">
//         Coordinates: RA : {parsedData?.DEC_RA?.ra}, DEC: {parsedData?.DEC_RA?.dec}
//       </p>
//       <p className="event">Event: {parsedData?.event}</p>
//       <p style={{ color: urgencyColor }} className="urgency">Urgency: {parsedData?.urgency}</p>
//     </div>
//   );
// };

// export default Card;

