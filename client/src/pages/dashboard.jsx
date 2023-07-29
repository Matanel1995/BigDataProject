// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { useTheme, Box } from "@mui/material";
import { tokens } from "../theme";
import StatBox from "../components/StatBox";
import NeoTable from '../components/NeoTable';
import PassedChart from '../components/PassedChart';
import Card from '../components/Card';
import SunTable from '../components/SunTable';
import MyButton from '../components/MyButton';
import WebSocketComponent from '../components/WebSocketComponent';
import NeoDistribution from '../components/NeoDistribution';

const HomePage = () => {
  // const sunImageUrl = "data:image/jpeg;base64,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";
  const sunImageUrl = 'https://i.gifer.com/origin/ea/eaf933959d3986c6aac35647c7cb9e74_w200.gif';
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [lastDoc, SetLastDoc] = useState();
   // Sample data for the histogram chart

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getLastEvent`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        SetLastDoc(data.lastdoc);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDoc();
  }, []);

    

  // Sample data for the histogram chart
  const [sumsByUrgency, setSumsByUrgency] = useState([]);
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const val = 7
        const response = await fetch(`http://localhost:8000/getevents?range=${val}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log(data)
        setSumsByUrgency(data.sumsByUrgency);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getLastEvent`);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data.lastdoc,'ssssssssssssssssssssssssssssssssssssssssssss')
        SetLastDoc(data.lastdoc);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDoc();
  }, []);


  const ballStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'red',
    position: 'absolute',
    top: '0',
    left: '0',
  };




  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  console.log('dsassssssssssssssssssssssssssssssssssssssssssssssss', sumsByUrgency)
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'end', alignItems: 'center', margin: 20 }}>
        <h2>Main Dash board</h2>
      </div>
      {/* ROW 1 */}
      <Box sx={{ borderRadius: '16px', width: '98%' }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="top"
        margin="20px"
        paddingTop="25px"
        paddingLeft="25px"
        height={"30vh"}
      >
        <div className='NeoTable' style={{ width: "100%" }}>
          <StatBox
            title="NEO Earth Close Approaches"
          />
          <div className='test' style={{ marginRight: 10 }}>
            <NeoTable />
          </div>
        </div>
      </Box>
      <div style={{ width: '80%', margin: '0 auto', display: 'flex' }}>
        <div style={{ backgroundColor: colors.primary[400], padding: '20px', margin: '20px', borderRadius: 20 }}>
          <WebSocketComponent data={lastDoc}/>
        </div>
        <div style={{ backgroundColor: colors.primary[400], padding: '20px', margin: '20px', borderRadius: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MyButton buttonMessage='Click For Last Day Event Dashboard' link="/cards" ></MyButton>
          </div>
          <h2 style={{ color: colors.grey[100] }}>Distribution of events according to urgency level last week</h2>
          <div style={{display:'flex', justifyContent :'center'}}>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
              </Pie>
              <Legend align="end" layout="vertical" verticalAlign="middle" />
              <Tooltip />
            </PieChart>
          </div>

        </div>
        <Box sx={{ borderRadius: '16px', width: '50%' }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="top"
          margin="20px"
          paddingTop="25px"
          paddingLeft="25px"
          height={"45vh"}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MyButton buttonMessage='Click For Sun Dashboard' link="/sunPage" ></MyButton>
            {sunImageUrl && <img src={sunImageUrl} alt="Sun" style={{ marginTop: '80px', width: '200px', borderRadius: '50%' }} />}
          </div>
        </Box>
        <PassedChart/>
        <NeoDistribution/>
      </div>
    </div>
  );
};

export default HomePage;
