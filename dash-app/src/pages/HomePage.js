// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import {  Link } from 'react-router-dom';

const HomePage = () => {
  // Sample data for the histogram chart
  const [sumsByUrgency, setSumsByUrgency] = useState([]);
  const [sun, setSun] = useState([]);
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const val  = 0
        const response = await fetch(`http://localhost:8000/getevents?range=${val}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data)
        setSumsByUrgency(data.sumsByUrgency);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  



  const data = [
    { name: 'Category A', value: 12 },
    { name: 'Category B', value: 19 },
    { name: 'Category C', value: 3 },
    { name: 'Category D', value: 5 },
    { name: 'Category E', value: 2 },
  ];


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
console.log('dsassssssssssssssssssssssssssssssssssssssssssssssss',sumsByUrgency)
  return (
    <div style={{flex:1}}>
    <div style={{ display: 'flex', justifyContent: 'center',alignContent:'end', alignItems: 'center',margin:20 }}>
        <h2>תצוגה מרכזת</h2>
      </div>
      <div style={{ width: '80%', margin: '0 auto',display:'flex' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', margin: '20px' }}>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="rgba(54, 162, 235, 0.6)" />
        </BarChart>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', margin: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/cards">כרטיסיות אירועים לפי יום אחרון</Link>
        <h2>    התפלגות אירועים לפי  רמת דחיפות שבוע אחרון</h2>
        
      </div>
        
        <PieChart width={300} height={200}>
            <Pie
              data={sumsByUrgency}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              label
            >
              {sumsByUrgency.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            
            <Legend align="end" layout="vertical" verticalAlign="middle" />
           
            <Tooltip />
          </PieChart>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
