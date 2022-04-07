import { Container, Grid, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import DeviceDetails from './DeviceDetails';
import LineChart from './LineChart';
import Chart from './Chart';
const DeviceModal = () => {

    return (
        <Container sx={{ mt: '5%' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    <Paper elevation={3}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <Chart />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <Typography>Hello</Typography>

                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    )
}

export default DeviceModal