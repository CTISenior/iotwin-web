import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DialogContentText } from '@mui/material';

export default function DeleteDialogBox(props){
    const { open, maxWidth, handleadd,handleClose, handleDelete,numSelected,deviceName, ...fullWidth} = props;

    return (
        <Dialog 
            open={open}
            {...fullWidth}
            maxWidth={maxWidth}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle style={{fontWeight:'bold'}}>
                {"Are you sure you want to delete "+(numSelected>0?numSelected:deviceName )+ " device?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    After the confirmation the device and all related data will become unrecoverable.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleDelete} autoFocus>Yes</Button>
            </DialogActions>
            
        </Dialog>
    );
}