import React from 'react';
import Navbar from './Navbar';
import DeviceCard from './DeviceCard';
import Badge from '@mui/material/Badge';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import Alert from './Alert';

const Dashboard = () => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const currentDate = new Date().toLocaleString();
    return (
        <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 px-4 border-bottom">
                <div className="d-flex align-items-center">
                    <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                    <h2 className="fs-2 m-0">Dashboard</h2>
                </div>
                <Badge
                    badgeContent={4} color="error"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                    <AddAlertIcon color="action" />
                </Badge>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Navbar />
            </nav>
            <DeviceCard name={"Device 1"} type={"Heat"} />

            <Alert value={45} open={open} handleClose={handleClose} vertical="top" horizontal="center" createdTime={currentDate} />

        </div>

    )
}

export default Dashboard