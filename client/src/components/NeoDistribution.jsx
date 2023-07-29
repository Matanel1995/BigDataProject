import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import React, { useEffect, useState } from 'react';

const Distribution = () => {

  // Initialize an object to keep track of counts for each category
  const categoryCounts = {
    "Meteors": 0,
    "FireBalls": 0,
    "Impactors(Astroids)": 0,
    "Disasters(Astroids)": 0,
    "Catastrophe(Astroids)": 0,
  };


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const [convertToChartData, setConvertToChartData] = useState([]);

  const endDate = new Date();
  const startDate = new Date(endDate);

  startDate.setDate(startDate.getDate() - 7);

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);


  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      console.log(`http://localhost:4000/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}`)
      try {
        const response = await fetch(`http://localhost:4000/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Get an array of near_earth_objects
        const nearEarthObjectsArray = Object.values(data.near_earth_objects);
        console.log(nearEarthObjectsArray);

        // Use map() to extract the "estimated_diameter_max" for each date
        const estimatedDiameterMaxMap = nearEarthObjectsArray.map(objects => {
          return objects.map(obj => obj.estimated_diameter.meters.estimated_diameter_max);
        });

        const estimatedDiameterMaxArray = estimatedDiameterMaxMap.flat();

        estimatedDiameterMaxArray.forEach((estimatedDiameterMax) => {
          const category = getCategory(estimatedDiameterMax);
          categoryCounts[category] += 1;
        });
        console.log(categoryCounts);
        setConvertToChartData(Object.entries(categoryCounts).map(([name, value]) => ({ name, value })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  //Add here chart to return
  return (
    <div className='test'>
      <PieChart width={300} height={300}>
        <Pie
          data={convertToChartData}
          dataKey= "value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label>
          {Object.entries(convertToChartData).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
        </Pie>
        <Legend align="end" layout="vertical" verticalAlign="middle" />
        <Tooltip/>
    </PieChart>
  </div >)
}

// Function to format the date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCategory(estimatedDiameterMax) {
  if (estimatedDiameterMax <= 0.03) {
    return "Meteors";
  } else if (estimatedDiameterMax > 0.03 && estimatedDiameterMax <= 0.3) {
    return "FireBalls";
  } else if (estimatedDiameterMax > 0.3 && estimatedDiameterMax <= 20) {
    return "Impactors(Astroids)";
  } else if (estimatedDiameterMax > 20 && estimatedDiameterMax <= 1000) {
    return "Disasters(Astroids)";
  } else {
    return "Catastrophe(Astroids)";
  }
}


export default Distribution;

