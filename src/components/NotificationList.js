import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ListItemText from '@mui/material/ListItemText';
import ErrorIcon from '@mui/icons-material/Error';
import ListItemIcon from '@mui/material/ListItemIcon';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import axios from 'axios';



const notificationCount = React.createContext();

const NotificationList = (props) => {
  const { anchorEl, open, handleClose, value, createdTime, tenantID } = props;
  const [notificationList, setNotificationList] = React.useState([]);

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
    }, 1000);
  }, []);
  function AllAlerts(props) {
    return <>
      {notificationList.map((list) => (
        <MenuItem key={list.message}>
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
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    handleClose();
  }
  return (
    <Menu

      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <AllAlerts />
    </Menu>
  )
}
export default NotificationList;