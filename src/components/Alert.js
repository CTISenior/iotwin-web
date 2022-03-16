import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function PositionedSnackbar(props){
  const {open,value,handleClose,vertical,horizontal,createdTime}=props;
  const heatValue=parseInt(value);
  return (
    <div style={{display:(heatValue<40)?'none':'block'}}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
       
        key={vertical + horizontal}>
        {(value>=40 && value<=49) ?(
            
            <Alert severity="warning" onClose={handleClose} sx={{ width: '100%' }}>The temperature is reached {heatValue} degrees at {createdTime} !</Alert>
        ):
        (
            <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>The temperature is reached {heatValue} degrees at {createdTime} !</Alert>
        )}
      </Snackbar>
    </div>
    );
}
