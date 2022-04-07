import { Container, Grid, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import Modal from '@mui/material/Modal';
import DeviceModal from './DeviceModal';

const devices = [];

axios.get('http://176.235.202.77:4000/api/v1/devices')
    .then((response) => {
        // Success 🎉
        console.log(response);
        response.data.forEach(element => {
            const temp = { name: element.name, type: "Temperature", id: element.sn, building_id: element.building_id };
            devices.push(temp);
        });
        console.log(devices);
    })
    .catch((error) => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

const ModalStyle = {
    position: 'absolute',
    top: '5%',
    left: '5%',
    right: '5%',
    overflow: 'scroll',
    height: '90%',
    display: 'block',
    backgroundColor: '#ebeced',
    display: 'flex',
}

const DevicesDemo = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const handleModalClose = () => {
        setOpenModal(false);
    }
    const handleModalOpen = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);


    const handleStart = (event) => {
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
        console.log("Hello")
    }
    const handleDisplay = (event) => {
        axios.get("http://localhost:8090/device/stop", {
            params: {
                topic: "topic stop"
            }
        })
        console.log("Hello")
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {devices.map(element => {
                    return (<Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3}>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems={'center'}
                            >
                                <SensorsSharpIcon sx={{ fontSize: 100, color: 'first.main' }} />
                                <Typography>
                                    {element.name}
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
                                        <IconButton variant='side' aria-label="display" onClick={handleModalOpen}>
                                            <ShowChartIcon fontSize='large' />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>);
                })}
            </Grid>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ModalStyle}>
                    <DeviceModal />
                </Box>
            </Modal>
        </Container>
    )
}

export default DevicesDemo