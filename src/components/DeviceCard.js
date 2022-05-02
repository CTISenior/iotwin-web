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
import { SnackbarProvider, useSnackbar } from 'notistack';


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

    const { name, id, building_id, types, sn } = props;

    const [openModal, setOpenModal] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [status, setStatus] = React.useState(false);


    const handleClick = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    const handleModalClose = () => {
        setOpenModal(false);
    }
    const handleModalOpen = (params) => {
        handleClick();
        setOpenModal(true);
    }

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

                        <Tooltip title="Display Device Details">
                            <IconButton variant='modal' aria-label="display" href={`/dashboard/monitor/${sn}/${id}/${name}/${building_id}/${types}/`} onClick={handleModalOpen} disabled={status}>
                                <ShowChartIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>

                    </Box>
                </Box>
            </Paper>
        </Grid >
    );
}