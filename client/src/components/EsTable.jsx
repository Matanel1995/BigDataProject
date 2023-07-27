import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const EsTable = ({data}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <div style={{ height: "55vh", overflowY: "auto" }}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{
            "& th": {
              backgroundColor: colors.primary[500],
            }
          }}>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Telescop Name</TableCell>
            <TableCell align="left">Dec</TableCell>
            <TableCell align="left">RA</TableCell>
            <TableCell align="left">Event</TableCell>
            <TableCell align="left">Urgency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} sx={{background: colors.primary[350]}}>
              <TableCell align="left">{item.time}</TableCell>
              <TableCell align="left">{item.telescopeName}</TableCell>
              <TableCell align="left">{item?.DEC_RA?.dec }</TableCell>
              <TableCell align="left">{item?.DEC_RA?.ra }</TableCell>
              <TableCell align="left">{item.event}</TableCell>
              <TableCell align="left">{item.urgency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default EsTable;
