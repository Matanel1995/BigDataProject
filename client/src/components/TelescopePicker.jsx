import React, { useState } from 'react';

const TelescopePicker = ({selectedOption, setSelectedOption}) => {

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>Choose a Telescope:</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="MMT">MMT</option>
        <option value="Very">Very Large Telescope</option>
        <option value="Subaru">Subaru Telescope</option>
        <option value="Binocular">Large Binocular Telescope</option>
        <option value="African">Southern African Large Telescope</option>
        <option value="Keck">Keck 1 and 2</option>
        <option value="Hobby-Eberly">Hobby-Eberly Telescope</option>
        <option value="Canarias">Gran Telescopio Canarias</option>
        <option value="Magellan">The Giant Magellan Telescope</option>
        <option value="Meter">Thirty Meter Telescope</option>
        <option value="Extremely">European Extremely Large Telescope</option>
      </select>
    </div>
  );
};

export default TelescopePicker;