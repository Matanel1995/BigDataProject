import React, { useState } from 'react';
import Cards from '../components/Cards';

import BackButton from '../components/BackButton';

const CardsScreen = () => {
  // Sample data for the cards
  const [showCards, setShowCards] = useState(false);
  const handleButtonClick = () => {
    setShowCards((curr)=> !curr); // This will set the showCards state to true when the button is pressed
  };

  const cardData = 
  [{"harvard_ref_#":1,"RA":"00:05:09.90","DEC":"+45:13:45.00","Epoch":2000,"RA PM":"-00.012","DEC PM":"-00.018","MAG":"6.70","Title HD":"A1Vn"},
  {"harvard_ref_#":2,"RA":"00:05:03.80","DEC":"-00:30:11.00","Epoch":2000,"RA PM":"+00.045","DEC PM":"-00.060","MAG":"6.29","Title HD":"gG9"},
  {"harvard_ref_#":3,"RA":"00:05:20.10","DEC":"-05:42:27.00","Epoch":2000,"RA PM":"-00.009","DEC PM":"+00.089","MAG":"4.61","Title HD":"K0III"},
  {"harvard_ref_#":4,"RA":"00:05:42.00","DEC":"+13:23:46.00","Epoch":2000,"RA PM":"+00.045","DEC PM":"-00.012","MAG":"5.51","Title HD":"G5III"},
  {"harvard_ref_#":5,"RA":"00:06:16.00","DEC":"+58:26:12.00","Epoch":2000,"RA PM":"+00.263","DEC PM":"+00.030","MAG":"5.96","Title HD":"G5V"},
  {"harvard_ref_#":6,"RA":"00:06:19.00","DEC":"-49:04:30.00","Epoch":2000,"RA PM":"+00.565","DEC PM":"-00.038","MAG":"5.70","Title HD":"G1IV"},
  {"harvard_ref_#":7,"RA":"00:06:26.50","DEC":"+64:11:46.00","Epoch":2000,"RA PM":"+00.008","DEC PM":"+00.000","MAG":"5.59","Title HD":"B9III"},
  {"harvard_ref_#":8,"RA":"00:06:36.80","DEC":"+29:01:17.00","Epoch":2000,"RA PM":"+00.380","DEC PM":"-00.182","MAG":"6.13","Title HD":"K0V"},
  {"harvard_ref_#":9,"RA":"00:06:50.10","DEC":"-23:06:27.00","Epoch":2000,"RA PM":"+00.100","DEC PM":"-00.045","MAG":"6.18","Title HD":"A7V"},
  {"harvard_ref_#":10,"RA":"00:07:18.20","DEC":"-17:23:11.00","Epoch":2000,"RA PM":"-00.018","DEC PM":"+00.036","MAG":"6.19","Title HD":"A6Vn"},
  {"harvard_ref_#":11,"RA":"00:07:44.10","DEC":"-02:32:56.00","Epoch":2000,"RA PM":"+00.027","DEC PM":"-00.002","MAG":"6.43","Title HD":"B8III"},
  {"harvard_ref_#":12,"RA":"00:07:46.80","DEC":"-22:30:32.00","Epoch":2000,"RA PM":"+00.052","DEC PM":"-00.044","MAG":"5.94","Title HD":"A2Vp:"},
  {"harvard_ref_#":13,"RA":"00:08:03.50","DEC":"-33:31:46.00","Epoch":2000,"RA PM":"-00.037","DEC PM":"+00.000","MAG":"5.68","Title HD":"K1III"},
  {"harvard_ref_#":14,"RA":"00:08:12.10","DEC":"-02:26:52.00","Epoch":2000,"RA PM":"+00.009","DEC PM":"-00.003","MAG":"6.07","Title HD":"K2III"},
  {"harvard_ref_#":15,"RA":"00:08:23.30","DEC":"+29:05:26.00","Epoch":2000,"RA PM":"+00.136","DEC PM":"-00.163","MAG":"2.06","Title HD":"B8IVp"},
    // Add more card data here if needed...
  ];

  return (
    <div>
      <BackButton />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Cards Screen</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleButtonClick}>Show Cards</button>  
      </div>
      {showCards && <Cards data={cardData} />} {/* The Cards component will only render if showCards is true */}
    </div>
  );
};

export default CardsScreen;
