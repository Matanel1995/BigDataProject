import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const SunTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    <Box sx={{ borderRadius: '16px', width: '98%' }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="top"
        margin="20px"
        paddingTop="25px"
        paddingLeft="25px"
        height={"30vh"}
      >
        
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>The Sun 15 Days Ephemeris</h1>
    <TableContainer component={Paper}style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{
            "& th": {
              backgroundColor: colors.primary[500],
            }
          }}>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">RA</TableCell>
            <TableCell align="center">Dec</TableCell>
            <TableCell align="center">Magnitude</TableCell>
            <TableCell align="center">Diameter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map((item, index) => (
            <TableRow key={index} sx={{background: colors.primary[350]}}>
              <TableCell align="center">{item.date}</TableCell>
              <TableCell align="center">{item.ra}</TableCell>
              <TableCell align="center">{item.dec}</TableCell>
              <TableCell align="center">{item.mag}</TableCell>
              <TableCell align="center">{item.diameter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default SunTable;