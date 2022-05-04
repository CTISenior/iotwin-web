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
import { Typography } from "@mui/material";

const NotificationList = (props) => {
  const { anchorEl, open, handleClose, setAlertCount, tenantID } = props;
  const [notificationList, setNotificationList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isChange, setIsChange] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState();

  const snackbarClose = (event) => {
    setSnackbarOpen(false);
    setSnackbarMessage(null);
  }

  const getNotification = () => {
    let notificationListItem = [];
    axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/alerts`)
      .then((response) => {
        response.data.forEach(element => {
          const temp = {
            id: element.id,
            message: element.message,
            createdTime: element.created_at,
            status: element.status,
            timestamp: element.timestamp
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

  // useEffect(() => {
  //   if (isChange)
  //     getNotification();
  // }, [isChange]);

  function AllAlerts(props) {
    return <>
      {notificationList.map((list) => (
        <MenuItem key={list.id} sx={{ backgroundColor: list.status === false ? '#F6F2F2' : 'white', margin: 1 }}>
          {list.status === 'error' ? (
            <ListItemIcon>
              <ErrorIcon fontSize="medium" color="error" />
            </ListItemIcon>
          ) : (
            <ListItemIcon>
              <WarningIcon fontSize="medium" color="warning" />
            </ListItemIcon>
          )}
          <Box>
            <ListItemText>{list.message}</ListItemText>
            <ListItemText>{
              new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(list.timestamp)
            }</ListItemText>
          </Box>
          <Box sx={{ justifyContent: "right", display: "flex" }}>
            <Tooltip title="View">
              <ListItemIcon sx={{ ml: '15px' }} onClick={() => handleView(list.id, list.status)}
              >
                <DoneIcon fontSize="medium" color='info' />
              </ListItemIcon>
            </Tooltip>
          </Box>
        </MenuItem>
      ))}
    </>

  }

  const handleView = (id, status) => {
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
        <Typography variant="modal" sx={{ marginLeft: 1 }}>
          Notifications
        </Typography>
        <AllAlerts />
      </Menu>
    </>

  )
}
export default NotificationList;