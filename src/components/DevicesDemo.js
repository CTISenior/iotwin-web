import { Container, Grid, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';

const DevicesDemo = () => {
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);


    const handleStart = (event) => {
        // setSerialValue(event.target.value);
        console.log("Hello");
        axios.get("http://localhost:8090/device/start", {
            params: {
                topic: "topic start"
            }
        })
        console.log("Hello")
    }
    const handleStop = (event) => {
        axios.get("http://localhost:8090/device/stop", {
            params: {
                topic: "topic stop"
            }
        })
        // setSerialValue(event.target.value);
        console.log("Hello")
    }
    const handleDisplay = (event) => {
        axios.get("http://localhost:8090/device/stop", {
            params: {
                topic: "topic stop"
            }
        })
        // setSerialValue(event.target.value);
        console.log("Hello")
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <SensorsSharpIcon sx={{ fontSize: 100, color: 'first.main' }} />
                            <Typography>
                                Device 1
                            </Typography>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                            >
                                <Tooltip title="Start Device">
                                    <IconButton variant='side' aria-label="play" onClick={handleStart}>
                                        <PlayArrowIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Stop Device">
                                    <IconButton variant='side' aria-label="stop" onClick={handleStop}>
                                        <StopIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Display Device Details">
                                    <IconButton variant='side' aria-label="display" onClick={handleOpen}>
                                        <ShowChartIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>

                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <SensorsSharpIcon sx={{ fontSize: 100, color: 'first.main' }} />
                            <Typography>
                                Device 1
                            </Typography>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                            >
                                <Tooltip title="Start Device">
                                    <IconButton variant='side' aria-label="play" onClick={handleStart}>
                                        <PlayArrowIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Stop Device">
                                    <IconButton variant='side' aria-label="stop" onClick={handleStop}>
                                        <StopIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Display Device Details">
                                    <IconButton variant='side' aria-label="display" onClick={handleOpen}>
                                        <ShowChartIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>

                            </Box>
                        </Box>
                    </Paper>
                </Grid>        <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <SensorsSharpIcon sx={{ fontSize: 100, color: 'first.main' }} />
                            <Typography>
                                Device 1
                            </Typography>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                            >
                                <Tooltip title="Start Device">
                                    <IconButton variant='side' aria-label="play" onClick={handleStart}>
                                        <PlayArrowIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Stop Device">
                                    <IconButton variant='side' aria-label="stop" onClick={handleStop}>
                                        <StopIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Display Device Details">
                                    <IconButton variant='side' aria-label="display" onClick={handleOpen}>
                                        <ShowChartIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>

                            </Box>
                        </Box>
                    </Paper>
                </Grid>        <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <SensorsSharpIcon sx={{ fontSize: 100, color: 'first.main' }} />
                            <Typography>
                                Device 1
                            </Typography>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                            >
                                <Tooltip title="Start Device">
                                    <IconButton variant='side' aria-label="play" onClick={handleStart}>
                                        <PlayArrowIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Stop Device">
                                    <IconButton variant='side' aria-label="stop" onClick={handleStop}>
                                        <StopIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Display Device Details">
                                    <IconButton variant='side' aria-label="display" onClick={handleOpen}>
                                        <ShowChartIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>

                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <SensorsSharpIcon sx={{ fontSize: 100, color: 'first.main' }} />
                            <Typography>
                                Device 1
                            </Typography>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                            >
                                <Tooltip title="Start Device">
                                    <IconButton variant='side' aria-label="play" onClick={handleStart}>
                                        <PlayArrowIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Stop Device">
                                    <IconButton variant='side' aria-label="stop" onClick={handleStop}>
                                        <StopIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Display Device Details">
                                    <IconButton variant='side' aria-label="display" onClick={handleOpen}>
                                        <ShowChartIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>

                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DevicesDemo