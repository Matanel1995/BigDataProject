import React, { useState } from 'react';

const EventPicker = ({selectedOption, setSelectedOption}) => {

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>Choose an Event:</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="GRB">GRB</option>
        <option value="Comet">Comet</option>
        <option value="UVR">UV Rise</option>
        <option value="X-Ray">X-Ray Rise</option>
        <option value="Apparent">Apparent Brightness Rise</option>
      </select>
    </div>
  );
};

export default EventPicker;