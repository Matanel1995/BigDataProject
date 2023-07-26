import React, { useState, useEffect,useRef } from 'react';
import Cards from '../components/Cards';
import {PieChart,Pie,Cell ,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import StatBox from "../components/StatBox";
import { tokens } from "../theme";
import { useTheme, Box } from "@mui/material";

const CardsScreen = () => {
  // Sample data for the cards
  const theme = useTheme();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const colors = tokens(theme.palette.mode);
  const [showCards, setShowCards] = useState(false);
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([])
  const [dataGroupedByTelescop, setDataGroupedByTelescop] = useState([])
  const [divHeight,setDivHeight] = useState(0)

  const divRef = useRef(null);

  // Function to check the height of the div
  const checkDivHeight = () => {
    if (divRef.current) {
      const divHeight = divRef.current.clientHeight;
      console.log(divHeight)
      return divHeight
    }
  };
  
  
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    setDivHeight(checkDivHeight-87)
  };

  useEffect(() => {
    // Add event listener to handle screen resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleButtonClick = () => {
    setShowCards((curr) => !curr); // This will set the showCards state to true when the button is pressed
  };
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const val = 2
        const response = await fetch(`http://localhost:8000/geteventsFull?range=${val}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const dataAns = await response.json();
        // console.log(data)
        setEvents(dataAns.events);



      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    // Function to fetch data from the server
    const countPerHour = async () => {
      const hourCounts = events.reduce((acc, message) => {
        const hour = getHour(message.time);
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {})
      const datas = Object.keys(hourCounts).map((hour) => ({
        hour: `${hour}:00`,
        count: hourCounts[hour],
      }));
      setData(datas)
     
      const preData = events.map((item) => ({
        name: item.telescopeName,
        value: 1,
      }));

      console.log(preData,'here it pre data')
      setDataGroupedByTelescop(groupAndSumByName(preData));
      console.log(dataGroupedByTelescop,'checkif good')



    };

    countPerHour();
  }, [events]);




  const getHour = (timestamp) => {
    const date = new Date(timestamp);

    return date.getHours();
  };

function groupAndSumByName(array) {
  const groupedData = {};

  array.forEach(item => {
    const name = item.name;
    const value = item.value;

    if (groupedData[name]) {
      groupedData[name] += value;
    } else {
      groupedData[name] = value;
    }
  });

  // Convert the grouped data object into an array of objects
  const resultArray = Object.keys(groupedData).map(name => ({ name, value: groupedData[name] }));

  return resultArray;
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28',
 '#FF8042', '#8884D8', '#FFA07A', '#20B2AA', '#9370DB', 
 '#32CD32', '#FF1493', '#00CED1', '#FF4500'];

  return (
    <div >
<div style={{display:'flex',justifyContent: 'center', alignItems: 'center'}}>
  <h1>Last day event </h1>
</div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around',margin:10}}>
      <div ref={divRef} style={{width:'100%',height:'100%',backgroundColor:colors.primary[400],borderRadius:20}}>
        <h2 style={{paddingLeft:4}}>Events per hour</h2>
   
            <BarChart width={screenWidth/3} height={screenHeight/3} style={{marginRight:20}}  data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
    
            
      </div>  
      <div style={{width:'100%',height:'100%',backgroundColor:colors.primary[400],marginLeft:20,borderRadius:20,flexDirection:'row'}}>
        <h2 style={{paddingLeft:4}}>Event detials</h2>
         <Cards data={events} size={checkDivHeight()-87} />       
      </div>  

      </div>
      <div style={{width:'100%',height:'100%',backgroundColor:colors.primary[400],borderRadius:20}}>
      <h1>
 telescope location istribution</h1>
      {/* <ResponsiveContainer aspect={8} > */}
      <PieChart width={screenWidth/1.3} height={screenHeight/4} >
              <Pie
                data={dataGroupedByTelescop}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {dataGroupedByTelescop.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
              </Pie>
              <Legend  align="end" layout="vertical" verticalAlign="middle" />
              <Tooltip />
            </PieChart>
            {/* </ResponsiveContainer> */}
   </div>
    </div>
  );
};

export default CardsScreen;
