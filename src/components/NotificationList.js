import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ErrorIcon from '@mui/icons-material/Error';
import ListItemIcon from '@mui/material/ListItemIcon';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';


const NotificationList = (props)=>{
   const {anchorEl,open,handleClose,value,createdTime}=props;
   const heatValue=parseInt(value);
   const handleDelete=()=>{
      
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
        <MenuItem>
          <ListItemIcon>
            <ErrorIcon fontSize="medium" color="error"/>
          </ListItemIcon>
            <div style={{flexDirection:'column',margin:10}}>
                <ListItemText>The temperature is reached {heatValue} degree</ListItemText>
                <ListItemText style={{color:'gray'}}>{createdTime} minutes ago</ListItemText>
            </div>
            <ListItemIcon onClick={handleDelete}>
            <DeleteIcon fontSize="medium"/>
          </ListItemIcon>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
        <ListItemIcon>
            <WarningIcon fontSize="medium" color="warning"/>
          </ListItemIcon>
            <div style={{flexDirection:'column',margin:10}}>
                <ListItemText>The temperature is reached {heatValue} degree</ListItemText>
                <ListItemText style={{color:'gray'}}>{createdTime} minutes ago</ListItemText>
            </div>
            <ListItemIcon onClick={handleDelete}>
            <DeleteIcon fontSize="medium"/>
          </ListItemIcon>
        </MenuItem>
      </Menu>
    )
}
export default NotificationList;