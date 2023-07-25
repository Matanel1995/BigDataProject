import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SunTable = () => {

    const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
      
        const response = await fetch('http://localhost:10000/getSunData');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('DATAAAAAA',data );
        setDataArray(data.sunData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
      

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">RA</TableCell>
            <TableCell align="right">Dec</TableCell>
            <TableCell align="right">Magnitude</TableCell>
            <TableCell align="right">Diameter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.date}
              </TableCell>
              <TableCell align="right">{item.ra}</TableCell>
              <TableCell align="right">{item.dec}</TableCell>
              <TableCell align="right">{item.mag}</TableCell>
              <TableCell align="right">{item.diameter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SunTable;