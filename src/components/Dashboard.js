import React ,{useState}from 'react';
import Navbar from './Navbar';
import DeviceCard from './DeviceCard';
import Badge from '@mui/material/Badge';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import Alert from './Alert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationList from './NotificationList';

const Dashboard = () => {
    const [openAlert, setOpenAlert] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openNotification = Boolean(anchorEl);
    
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };
    const handleClickNotificationOpen = (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClickNotificationClose =()=>{
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
                <NotificationList anchorEl={anchorEl} open={openNotification} handleClose={handleClickNotificationClose} value={40} createdTime={currentDate}/>
                <div className='col-lg-1 offset-lg-1 flex-row'>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>              
                <Badge
                    badgeContent={4} color="error"
                    onCanchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                    <Tooltip title="Notifications">
                    <IconButton onClick={handleClickNotificationOpen}>
                        <AddAlertIcon color="action"/>
                    </IconButton>
                    </Tooltip>
                </Badge>
                </div>
                <Navbar />
            </nav>
            <div className="d-flex row" style={{margin:5}}>
                <DeviceCard name={"Device 1"} type={"Heat"} />
                <DeviceCard name={"Device 2"} type={"Heat"} />
                <DeviceCard name={"Device 3"} type={"Heat"} />
                <DeviceCard name={"Device 4"} type={"Heat"} />
                <DeviceCard name={"Device 5"} type={"Heat"} />
                <DeviceCard name={"Device 6"} type={"Heat"} />
                <DeviceCard name={"Device 7"} type={"Heat"} />
                <DeviceCard name={"Device 8"} type={"Heat"} />
                <DeviceCard name={"Device 9"} type={"Heat"} />
            </div>
            <Alert value={45} open={openAlert} handleClose={handleCloseAlert} vertical="top" horizontal="right" createdTime={currentDate} />
        </div>
    )
}

export default Dashboard