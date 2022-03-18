import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DeviceDetails from './DeviceDetails';
import Tooltip from '@mui/material/Tooltip';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    return {
        position: 'absolute',
        top: '5%',
        left: '5%',
        right: '5%',
        overflow: 'scroll',
        height: '100%',
        display: 'block'
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '90%',
        backgroundImage: "linear-gradient(to right,#baf3d7,#c2f5de,#cbf7e4,#d4f8ea,#ddfaef);",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function DeviceCardComponent(props) {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const { name, type, id, building_id } = props;

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
                    <div className="p-2 bg-white shadow-sm d-flex justify-content-around flex-column align-items-center" style={{width:'auto',margin:5}}>
                        <div className='p-1 align-items-center text-center'>
                            <i className="fas fa-fire-alt fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                            <h3 className="fs-2" >{name}</h3>
                            <p className="fs-5">{type}</p>
                        </div>
                        <div className='p-0 align-items-center'>
                            <Tooltip title="Start Device">
                                <IconButton aria-label="play" onClick={handleStart}>
                                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Stop Device">
                                <IconButton aria-label="stop" onClick={handleStop}>
                                    <StopIcon sx={{ height: 38, width: 38 }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Display Device Details">
                                <IconButton aria-label="display" onClick={handleOpen}>
                                    <ShowChartIcon sx={{ height: 38, width: 38 }} />
                                </IconButton>
                            </Tooltip>

                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={open}>
                                <div style={modalStyle} className={classes.paper}>
                                    <DeviceDetails id={id} building_id={building_id} onClose={handleClose} />
                                </div>
                            </Modal>
                        </div>
                    </div>
    );
}