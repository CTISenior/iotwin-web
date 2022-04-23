import * as React from 'react';
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

// <AlertComponent message={"test"} type={"error"} />
export default function DeleteDialogBox(props) {
    const { open, maxWidth, selectedRowName, selectedRowSn, selectedRowId, handleclose, ...fullWidth } = props;

    const handleDelete = async () => {
        console.log(selectedRowSn);
        await axios.delete('http://176.235.202.77:4000/api/v1/devices/' + selectedRowSn + '-' + selectedRowId)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(handleclose);
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
                <Stack direction="row" spacing={3}>
                    <Button onClick={handleclose} variant="contained" startIcon={<CancelIcon />} style={{ backgroundColor: '#FF0000', color: '#FFF', textTransform: 'capitalize' }}>No</Button>
                    <Button onClick={handleDelete} variant="contained" startIcon={<DoneIcon />} autoFocus style={{ backgroundColor: '#228B22', color: 'white', textTransform: 'capitalize' }}>Yes</Button>
                </Stack>
            </DialogActions>

        </Dialog>
    );
}