import React, { useEffect, useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ErrorIcon from '@mui/icons-material/Error';
import ListItemIcon from '@mui/material/ListItemIcon';
import WarningIcon from '@mui/icons-material/Warning';
import { Box } from '@mui/system';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import SnackbarContent from '@mui/material/SnackbarContent';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ClearAllTenantAlert from './ClearAllTenantAlert';
import Moment from 'react-moment';

const NotificationList = (props) => {
  const { anchorEl, open, handleClose, setAnchorElNotification, setAlertCount, tenantID } = props;
  const [notificationList, setNotificationList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isChange, setIsChange] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState();
  const [openClearAllDialog, setOpenClearAllDialog] = useState(false);

  const snackbarClose = (event) => {
    setSnackbarOpen(false);
    setSnackbarMessage(null);
  }
  const handleOpenClearAll = () => {
    setOpenClearAllDialog(true);
  }
  const handleCloseClearAll = () => {
    setAlertCount(0);
    setOpenClearAllDialog(false);
  }

  const getNotification = () => {
    let notificationListItem = [];
    axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/alerts`)
      .then((response) => {
        response.data.forEach(element => {
          const temp = {
            id: element.id,
            message: element.message,
            deviceName: element.device_name,
            createdTime: element.created_at,
            severity: element.severity,
            timestamptz: element.timestamptz,
            status: element.status
          };
          setAlertCount(response.data.length);
          notificationListItem.push(temp);
        });
        setNotificationList(notificationListItem);
        setIsChange(false);
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
      });

  }
  // useEffect(() => {
  //   getNotification();
  // }, []);

  useEffect(() => {
    setInterval(function tick() {
      if (tenantID != undefined) {
        getNotification();
      }
    }, 2000)
  }, [tenantID]);

  useEffect(() => {
    if (isChange)
      getNotification();
  }, [isChange]);

  function AllAlerts(props) {
    return <>
      {notificationList.map((list) => (
        <MenuItem key={list.id} sx={{ backgroundColor: list.status === false ? '#F6F2F2' : 'white', margin: 1, justifyContent: 'space-between', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box>
            {list.severity === "critical" ? (
              <ListItemIcon>
                <ErrorIcon color="error" />
              </ListItemIcon>
            ) : (
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <ListItemText>[{list.deviceName}] - {list.message}</ListItemText>
            <ListItemText><Moment format='Do MMMM YYYY, h:mm:ss a'>{list.timestamptz}</Moment></ListItemText>
          </Box>
          <Box>
            <Tooltip title="Clear">
              <ListItemIcon sx={{ ml: '15px' }} onClick={() => handleClear(list.id, list.status)}
              >
                <DoneIcon fontSize="medium" color='info' />
              </ListItemIcon>
            </Tooltip>
          </Box>
        </MenuItem>
      ))}
    </>

  }

  const handleClear = (id, status) => {
    axios.put('http://176.235.202.77:4000/api/v1/alerts/' + id, {
      "status": !status
    })
      .then(function (response) {
        setSnackbarColor('#4caf50');
        setIsChange(true);
        setSnackbarOpen(true);
        setSnackbarMessage(response.data)
      })
      .catch(function (error) {
        setSnackbarColor('#ff5722');
        setSnackbarOpen(true);
        setSnackbarMessage('The alert status could not changed successfully')
      });
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: ' top',
          horizontal: 'center'
        }}
        open={snackbarOpen}
        onClose={snackbarClose}
        autoHideDuration={3000}
      >
        <SnackbarContent
          style={{
            backgroundColor: snackbarColor,
          }}
          message={snackbarMessage}
          action={[
            <Tooltip title="Close">
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                onClick={snackbarClose}
              >x</IconButton>
            </Tooltip>
          ]}
        />
      </Snackbar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Grid
          item
          xs={5}
          md={5}
          lg={5}
          sx={{ justifyContent: "space-around", display: "flex", marginTop: 2 }}
        >
          {notificationList.length > 0 ? (
            <>
              <Typography variant="modal" sx={{ marginLeft: 1 }}>
                Notifications
              </Typography>
              <Box>
                <Tooltip title="Clear All">
                  <Button variant="contained" onClick={handleOpenClearAll} color="info" startIcon={<ClearAllIcon />} style={{ color: '#FFF', textTransform: 'capitalize' }}>Clear All</Button>
                </Tooltip>
              </Box>
            </>
          ) : (
            <>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="modal" sx={{ marginLeft: 8 }}>
                  Notifications
                </Typography>
                <Typography sx={{ margin: 2 }}>
                  There is no unread notification
                </Typography>
              </Box>
            </>
          )}
        </Grid>
        <AllAlerts />
        <ClearAllTenantAlert open={openClearAllDialog} handleclose={handleCloseClearAll} fullWidth={true} maxWidth='md' setIsChange={setIsChange} tenantID={tenantID} setAnchorElNotification={setAnchorElNotification} />
      </Menu>
    </>

  )
}
export default NotificationList;