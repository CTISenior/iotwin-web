import { Container, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import LineChart from './LineChart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

const DeviceModal = (props) => {
    const { name, id, types, onClose, list } = props;
    function createData(name, hour, day, week, month, year) {
        return { name, hour, day, week, month, year };
    }

    const rows = [
        createData('Average Heat', 36, 32, 33, 35, 35),
        createData('Max Heat', 40, 52, 48, 46, 50),
        createData('Min Heat', 27, 20, 22, 24, 28),
    ];

    return (


        <Container sx={{ mt: '5%' }}>
            <Tooltip title="Close">
                <CloseIcon sx={{ width: 'auto', color: 'action.active', right: 10, position: 'absolute', top: 5, }} onClick={onClose} />
            </Tooltip>
            <Grid container spacing={3} xs={12} width={1}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <LineChart id={id} types={types} onClose={onClose} list={list} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} height={1}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        sx={{ m: '0 auto' }}
                    >
                        <Grid container spacing={1} justifyContent={"center"} >
                            <Grid item xs={12}   >
                                <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
                                    <Box display={'flex'}
                                        alignItems={'center'}>
                                        <DeviceThermostatIcon sx={{ fontSize: 90, color: 'secondary.main' }} />
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                        >
                                            <Typography variant='modal'>Device ID</Typography>
                                            <Typography variant='side'>{id}</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}   >
                                <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
                                    <Box display={'flex'}
                                        alignItems={'center'}>
                                        <DeviceThermostatIcon sx={{ fontSize: 90, color: 'secondary.main' }} />
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                        >
                                            <Typography variant='modal'>Device Name</Typography>
                                            <Typography variant='side'>{name}</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}   >
                                <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
                                    <Box display={'flex'}
                                        alignItems={'center'}>
                                        <DeviceThermostatIcon sx={{ fontSize: 90, color: 'secondary.main' }} />
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                        >
                                            <Typography variant='modal'>Max Heat</Typography>
                                            <Typography variant='side'>32</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}   >
                                <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
                                    <Box display={'flex'}
                                        alignItems={'center'}>
                                        <DeviceThermostatIcon sx={{ fontSize: 90, color: 'secondary.main' }} />
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                        >
                                            <Typography variant='modal'>Average Heat</Typography>
                                            <Typography variant='side'>32</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </Container >
    )
}

export default DeviceModal