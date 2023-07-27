import React, { useState } from 'react';

const UrgencyPicker = ({selectedOption, setSelectedOption}) => {

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>Choose an Urgency:</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="GRB">1</option>
        <option value="Comet">2</option>
        <option value="UVR">3</option>
        <option value="X-Ray">4</option>
        <option value="Apparent">5</option>
      </select>
    </div>
  );
};

export default UrgencyPicker;