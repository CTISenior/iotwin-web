import React, { useState } from 'react';
import Navbar from './Navbar';
import DeviceCard from './DeviceCard';
import Badge from '@mui/material/Badge';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import Alert from './Alert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationList from './NotificationList';
import axios from 'axios';

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
function AllDevices(props) {

    return <>
        {devices.map(element => {
            return (<div>
                <DeviceCard name={element.name} type={"Heat"} id={element.id} building_id={element.building_id} />
            </div>);
        })}
    </>

}

const Dashboard = () => {
    const [openAlert, setOpenAlert] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openNotification = Boolean(anchorEl);

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };
    const handleClickNotificationOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClickNotificationClose = () => {
        setAnchorEl(null);
    }
    const currentDate = new Date().toLocaleString();
    return (

        <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 px-4 border-bottom">
                <div className="d-flex align-items-center">
                    <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                    <h2 className="fs-2 m-0">Dashboard</h2>
                </div>

                <NotificationList anchorEl={anchorEl} open={openNotification} handleClose={handleClickNotificationClose} value={40} createdTime={currentDate} />

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Navbar />
                <div className='col-md-1 offset-md-1'>
                    <Badge
                        badgeContent={4} color="error"
                        onC
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                        <Tooltip title="Notifications">
                            <IconButton onClick={handleClickNotificationOpen}>
                                <AddAlertIcon color="action" />
                            </IconButton>
                        </Tooltip>
                    </Badge>
                </div>
            </nav>
            <AllDevices />
            <Alert value={45} open={openAlert} handleClose={handleCloseAlert} vertical="top" horizontal="right" createdTime={currentDate} />

        </div>

    )
}

export default Dashboard