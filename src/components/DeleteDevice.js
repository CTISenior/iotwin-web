import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DialogContentText } from '@mui/material';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function DeleteDialogBox(props) {
    const { open, maxWidth, setIsChange, selectedRowName, selectedRowSn, selectedRowId, handleclose, ...fullWidth } = props;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const snackbarClose = (event) => {
        setSnackbarOpen(false);
        setSnackbarMessage(null);
    }
    const handleDelete = async () => {
        console.log(selectedRowSn);
        await axios.delete('http://176.235.202.77:4000/api/v1/devices/' + selectedRowId + '.' + selectedRowSn)
            .then(function (response) {
                console.log(response);
                setIsChange(true);
                setSnackbarOpen(true);
                setSnackbarMessage(response.data)
            })
            .catch(function (error) {
                console.log(error);
                setSnackbarOpen(true);
                setSnackbarMessage('New device could not deleted successfully')
            })
            .finally(() => {
                setTimeout(function () {
                    handleclose();
                }, 300)
            });
    }
    return (
        <>
            <Snackbar
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
                    <Stack direction="row" spacing={3}>
                        <Button onClick={handleclose} variant="contained" startIcon={<CancelIcon />} style={{ backgroundColor: '#FF0000', color: '#FFF', textTransform: 'capitalize' }}>No</Button>
                        <Button onClick={handleDelete} variant="contained" startIcon={<DoneIcon />} autoFocus style={{ backgroundColor: '#228B22', color: 'white', textTransform: 'capitalize' }}>Yes</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>

    );
}