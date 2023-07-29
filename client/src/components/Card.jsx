// Card.js
import React from 'react';

import { useTheme, Box } from "@mui/material";
import { tokens } from "../theme";

const Card = ({ data }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //   const parsedData = JSON.parse(data) 
  const parsedData = data ? JSON.parse(data) : undefined;
  const urgencyColor = parsedData?.urgency > 4 ? 'red' : colors.grey[100];
  return (
    <div className="card" >
      <h1 style={{color:colors.grey[100]}}> Last simulated event </h1>
      <p style={{color:colors.grey[100]}} className="telescope-name">Telescope Name:  {parsedData?.telescopeName}</p>
      <p style={{color:colors.grey[100]}} className="time">Time: {parsedData?.time}</p>
      <p style={{color:colors.grey[100]}} className="coordinates">
        Coordinates: RA : {parsedData?.DEC_RA?.ra}, DEC: {parsedData?.DEC_RA?.dec}
      </p>
      <p style={{color:colors.grey[100]}} className="event">Event: {parsedData?.event}</p>
      <p style={{ color: urgencyColor }} className="urgency">Urgency: {parsedData?.urgency}</p>
    </div>
  );
};

export default Card;
