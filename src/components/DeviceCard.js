import { Grid, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import Modal from '@mui/material/Modal';
import DeviceModal from './DeviceModal';

const ModalStyle = {
    position: 'absolute',
    top: '5%',
    left: '5%',
    right: '5%',
    overflow: 'scroll',
    height: '90%',
    backgroundColor: '#ebeced',
    display: 'flex',
}


export default function DeviceCard(props) {

    const { name, id, building_id, types, socket, list } = props;

    const [openModal, setOpenModal] = React.useState(false);
    const handleModalClose = () => {
        setOpenModal(false);
    }
    const handleModalOpen = (params) => {
        setOpenModal(true);
    }
    const handleStart = (event) => {
        socket.emit("start", id);
    }
    const handleStop = (event) => {
        socket.emit("stop", id);
    }
    // React.useEffect(() => {
    //     console.log("New list is : " + JSON.stringify(list));
    // }, [list])

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <SensorsSharpIcon sx={{ fontSize: 100, color: 'first.main' }} />
                    <Typography>
                        {name}
                    </Typography>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Tooltip title="Start Device">
                            <IconButton variant='modal' aria-label="play" onClick={handleStart}>
                                <PlayArrowIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Stop Device">
                            <IconButton variant='modal' aria-label="stop" onClick={handleStop}>
                                <StopIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Display Device Details">
                            <IconButton variant='modal' aria-label="display" onClick={handleModalOpen}>
                                <ShowChartIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                        <Modal
                            open={openModal}
                            onClose={handleModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={ModalStyle}>
                                <DeviceModal name={name} id={id} building_id={building_id} types={types} onClose={handleModalClose} list={list} />
                            </Box>
                        </Modal>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
}