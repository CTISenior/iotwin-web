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
import SnackbarContent from '@mui/material/SnackbarContent';
import conf from '../conf.json'

export default function DeleteDialogBox(props) {
    const { open, maxWidth, isAsset, setIsChange, id, handleclose, ...fullWidth } = props;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState();

    const snackbarClose = (event) => {
        setSnackbarOpen(false);
        setSnackbarMessage(null);
    }
    const deleteDeviceAlert = async () => {
        await axios.delete(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/devices/${id}/alerts`)
            .then(function (response) {
                setSnackbarColor('#4caf50');
                setIsChange(true);
                setSnackbarOpen(true);
                setSnackbarMessage(response.data)
            })
            .catch(function (error) {
                setSnackbarColor('#ff5722');
                setSnackbarOpen(true);
                setSnackbarMessage('The device alerts could not changed successfully')
            })
            .finally(() => {
                setTimeout(function () {
                    handleclose();
                }, 300)
            });
    }
    const deleteAssetAlert = async () => {
        await axios.delete(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/assets/${id}/alerts`)
            .then(function (response) {
                setSnackbarColor('#4caf50');
                setIsChange(true);
                setSnackbarOpen(true);
                setSnackbarMessage(response.data)
            })
            .catch(function (error) {
                setSnackbarColor('#ff5722');
                setSnackbarOpen(true);
                setSnackbarMessage('The asset alerts could not changed successfully')
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
            <Dialog
                open={open}
                {...fullWidth}
                maxWidth={maxWidth}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle style={{ fontWeight: 'bold' }}>
                    {"Are you sure you want to delete all alerts?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        After the confirmation the alerts and all related data will become unrecoverable.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={3}>
                        <Button onClick={handleclose} variant="contained" startIcon={<CancelIcon />} style={{ backgroundColor: '#f44336', color: '#FFF', textTransform: 'capitalize' }}>No</Button>
                        {isAsset ? (
                            <Button onClick={deleteAssetAlert} variant="contained" startIcon={<DoneIcon />} autoFocus style={{ backgroundColor: '#228B22', color: 'white', textTransform: 'capitalize' }}>Yes</Button>
                        ) : (
                            <Button onClick={deleteDeviceAlert} variant="contained" startIcon={<DoneIcon />} autoFocus style={{ backgroundColor: '#228B22', color: 'white', textTransform: 'capitalize' }}>Yes</Button>
                        )}
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
}