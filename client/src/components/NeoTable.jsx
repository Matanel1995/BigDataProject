import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const NeoTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {

        const response = await fetch('http://localhost:4000/Last24');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDataArray(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Log the dataArray whenever it changes
    console.log("THIS IS DATA ARRAY!!!!", dataArray);
  }, [dataArray]);

  return (
    <div style={{ height: "20vh", overflowY: "auto" }}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{
            "& th": {
              backgroundColor: colors.primary[500],
            }
          }}>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Designation</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Close-approach</TableCell>
            <TableCell align="left">Distance (AU)</TableCell>
            <TableCell align="left">Minimum approach distance (AU)</TableCell>
            <TableCell align="left">Maximum approach distance (AU)</TableCell>
            <TableCell align="left">Velocity</TableCell>
            <TableCell align="left">Magnitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map((item, index) => (
            <TableRow key={index} sx={{background: colors.primary[350]}}>
              <TableCell align="left">{item[0]}</TableCell>
              <TableCell align="left">{item[1]}</TableCell>
              <TableCell align="left">{item[3]}</TableCell>
              <TableCell align="left">{item[4]}</TableCell>
              <TableCell align="left">{item[5]}</TableCell>
              <TableCell align="left">{item[6]}</TableCell>
              <TableCell align="left">{item[7]}</TableCell>
              <TableCell align="left">{item[9]}</TableCell>
              <TableCell align="left">{item[10]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default NeoTable;
