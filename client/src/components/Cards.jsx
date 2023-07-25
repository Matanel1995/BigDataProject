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
                <Typography variant="h5" component="h2">
                  {item["Title HD"]}
                </Typography>
                <Typography color="textSecondary">
                  Harvard Reference: {item["harvard_ref_#"]}
                </Typography>
                <Typography color="textSecondary">
                  RA: {item["RA"]}
                </Typography>
                <Typography color="textSecondary">
                  DEC: {item["DEC"]}
                </Typography>
                <Typography color="textSecondary">
                  Epoch: {item["Epoch"]}
                </Typography>
                <Typography color="textSecondary">
                  RA PM: {item["RA PM"]}
                </Typography>
                <Typography color="textSecondary">
                  DEC PM: {item["DEC PM"]}
                </Typography>
                <Typography color="textSecondary">
                  MAG: {item["MAG"]}
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
