import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Cards = ({ data }) => {
  return (
    <div style={{ height: '400px', overflowY: 'auto', margin: '20px', }}>
      <Grid container spacing={3} justifyContent="center">
        {data.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary">
                  {item["time"]}
                </Typography>
                <Typography color="textSecondary">
                  Telescop Name: {item["telescopeName"]}
                </Typography>
                <Typography color="textSecondary">
                  DEC: {item["DEC_RA"].dec}
                </Typography>
                <Typography color="textSecondary">
                  RA: {item["DEC_RA"].ra}
                </Typography>
                <Typography color="textSecondary">
                  Event: {item["event"]}
                </Typography>
                <Typography color="textSecondary">
                  Urgency: {item["urgency"]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
