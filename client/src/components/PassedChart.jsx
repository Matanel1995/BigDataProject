import React, { useEffect, useState } from 'react';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const PassedChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [dataArray, setDataArray] = useState([]);

  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 0);

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);


//get link should look like this : http://localhost:4000/feed?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {

        const response = await fetch(`http://localhost:4000/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("TESTTTTTTTTTTTTTT");
        console.log(data.near_earth_objects);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   // Log the dataArray whenever it changes
  //   console.log("THIS IS DATA ARRAY!!!!", dataArray);
  // }, [dataArray]);

  return (
    <div>
    </div>
  );
};

// Function to format the date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default PassedChart;
