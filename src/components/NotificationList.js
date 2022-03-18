import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ListItemText from '@mui/material/ListItemText';
import ErrorIcon from '@mui/icons-material/Error';
import ListItemIcon from '@mui/material/ListItemIcon';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const NotificationList = (props)=>{
   const {anchorEl,open,handleClose,value,createdTime}=props;
   const heatValue=parseInt(value);
   const notificationListItem = [
    {
        message: "The temperature is reached "+ heatValue +" degree",
        createdTime: createdTime,
        status:"error",
    },
    {
      message: "The temperature is reached "+ heatValue +" degree",
      createdTime: createdTime,
      status:"warning",
    }
];
   const handleDelete=()=>{
      //axios.post("http://localhost:9090/api/v1/alerts",{notification})
   }
    return (
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
      {notificationListItem.map((list) => (
        <MenuItem key={list.message}>
           {list.status==='error'?(
             <ListItemIcon>
                <ErrorIcon fontSize="medium" color="error"/>
            </ListItemIcon>
           ):(
            <ListItemIcon>
              <WarningIcon fontSize="medium" color="warning"/>
            </ListItemIcon>
           )}
           <div style={{flexDirection:'column',margin:10}}>
                <ListItemText>{list.message}</ListItemText>
                <ListItemText style={{color:'gray'}}>{list.createdTime}</ListItemText>
           </div>
           <ListItemIcon onClick={handleDelete}>
              <DeleteIcon fontSize="medium"/>
          </ListItemIcon>
        </MenuItem>
    ))}
      </Menu>
    )
}
export default NotificationList;