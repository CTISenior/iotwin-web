import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DialogContentText } from '@mui/material';
import axios from 'axios';

export default function DeleteDialogBox(props) {
    const { open, maxWidth, selectedRowName, selectedRowId, handleclose, ...fullWidth } = props;

    const handleDelete = async () => {

    }
    return (
        <Dialog
            open={open}
            {...fullWidth}
            maxWidth={maxWidth}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle style={{ fontWeight: 'bold' }}>
                {"Are you sure you want to delete " + selectedRowName + " device?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    After the confirmation the device and all related data will become unrecoverable.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleclose}>No</Button>
                <Button onClick={handleDelete} autoFocus>Yes</Button>
            </DialogActions>

        </Dialog>
    );
}