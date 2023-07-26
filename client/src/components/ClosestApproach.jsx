import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const ClosestApproach = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [closestApproachData, setClosestApproachData] = useState({});
    useEffect(() => {
        // Function to fetch data from the server
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:10000/getClosestApproach');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('closestApproachData', data);
                setClosestApproachData(data.closestApproachData); // Correct variable name here
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box
            sx={{
                borderRadius: '16px',
                width: '98%',
                backgroundColor: colors.primary[400],
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '20px',
                padding: '25px',
                height: '45vh',
            }}
        >
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Closest Approach of The Sun to Earth</h1>
            <TableContainer component={Paper} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table aria-label="closest-approach-table">
                    <TableBody>
                        {Object.entries(closestApproachData).map(([key, value]) => (
                            <TableRow key={key} sx={{ background: colors.primary[350] }}>
                                <TableCell component="th" scope="row" align="center" style={{ fontSize: '14px' }}>
                                    {key}
                                </TableCell>
                                <TableCell align="center" style={{ fontSize: '14px' }}>{value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
};

export default ClosestApproach;



