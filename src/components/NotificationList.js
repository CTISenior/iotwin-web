import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ErrorIcon from '@mui/icons-material/Error';
import ListItemIcon from '@mui/material/ListItemIcon';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const NotificationList = (props) => {
  const { anchorEl, open, handleClose, setAlertCount, tenantID } = props;
  const [notificationList, setNotificationList] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const snackbarClose = (event) => {
    setSnackbarOpen(false);
    setSnackbarMessage(null);
  }
  React.useEffect(() => {
    let notificationListItem = [];
    setInterval(function tick() {
      notificationListItem = [];
      axios.get('http://176.235.202.77:4000/api/v1/tenants/ctis/alerts')
        .then((response) => {
          response.data.forEach(element => {
            const temp = {
              id: element.id,
              message: element.message,
              createdTime: element.created_at,
              status: element.status,
            };
            setAlertCount(response.data.length);
            notificationListItem.push(temp);
          });
          setNotificationList(notificationListItem);
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
    }, 2500);
  }, []);
  function AllAlerts(props) {
    return <>
      {notificationList.map((list) => (
        <MenuItem key={list.id}>
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
            <ListItemText style={{ color: 'gray' }}>{list.createdTime}</ListItemText>
          </Box>
          <ListItemIcon sx={{ ml: '10px' }} onClick={() => handleDelete(list.id)}>
            <DeleteIcon fontSize="medium" />
          </ListItemIcon>
        </MenuItem>
      ))}
    </>

  }
  const handleDelete = (id) => {
    axios.delete('http://176.235.202.77:4000/api/v1/alerts/' + id)
      .then(function (response) {
        console.log(response);
        setSnackbarOpen(true);
        setSnackbarMessage(response.data)
      })
      .catch(function (error) {
        console.log(error);
        setSnackbarOpen(true);
        setSnackbarMessage('The alert could not deleted successfully')
      }).finally(() => {
        setTimeout(function () {
          handleClose();
        }, 300)
      })
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: ' bottom',
          horizontal: 'right'
        }}
        open={snackbarOpen}
        onClose={snackbarClose}
        autoHideDuration={3000}
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
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <AllAlerts />
      </Menu>
    </>

  )
}
export default NotificationList;