import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextFieldItem from './TextField';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import SnackbarContent from '@mui/material/SnackbarContent';

export default function AddDialogBox(props) {
    const { open, maxWidth, tenantID, setIsChange, setAlertMessage, selectedRow, setOpenEditDialog, setSelectedRow, ...fullWidth } = props;
    const [id, setID] = useState();
    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [location, setLocation] = useState();
    const [capacity, setCapacity] = useState();
    const [description, setDescription] = useState();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState();
    const snackbarClose = (event) => {
        setSnackbarOpen(false);
        setSnackbarMessage(null);
    }
    const handleclose = (event) => {
        setOpenEditDialog(false);
        setSelectedRow([]);
    }
    useEffect(() => {
        setID(selectedRow[0]);
        setName(selectedRow[1]);
        setCity(selectedRow[2]);
        setLocation(selectedRow[3]);
        setCapacity(selectedRow[4]);
        setDescription(selectedRow[5]);
    }, [selectedRow]);


    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleCapacityChange = (event) => {
        setCapacity(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleadd = async () => {
        await axios.put('http://176.235.202.77:4000/api/v1/assets/' + id, {
            "name": name,
            "city": city,
            "location": location,
            "capacity": capacity,
            "description": description,
        })
            .then(function (response) {
                setSnackbarColor('#4caf50');
                setIsChange(true);
                setSnackbarOpen(true);
                setSnackbarMessage(response.data)
            })
            .catch(function (error) {
                setSnackbarColor('#ff5722');
                setSnackbarOpen(true);
                setSnackbarMessage('The asset could not edited successfully')
            })
            .finally(() => {
                setTimeout(function () {
                    handleclose();
                }, 300)
            })

    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
            <Dialog open={open}
                {...fullWidth}
                maxWidth={maxWidth}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle style={{ backgroundColor: '#305680', padding: '16px', color: 'white' }}>Edit Asset</DialogTitle>
                <DialogContent>
                    <TextFieldItem
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={handleNameChange}
                        required={true}
                        // error={true}
                        helperText="Name is required." />
                    <TextFieldItem
                        autoFocus
                        margin="dense"
                        id="city"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={city}
                        onChange={handleCityChange}
                        required={true}
                        // error={true}
                        helperText="City is required." />
                    <TextFieldItem
                        autoFocus
                        margin="dense"
                        id="location"
                        label="Location"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={location}
                        onChange={handleLocationChange}
                        required={true}
                        // error={true}
                        helperText="Location is required." />
                    <TextFieldItem
                        autoFocus
                        margin="dense"
                        id="capacity"
                        label="Capacity (m²)"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={capacity}
                        onChange={handleCapacityChange}
                        required={true}
                        // error={true}
                        helperText="Capacity is required." />
                    <TextFieldItem
                        id="description"
                        label="Description"
                        multiline
                        maxRows={10}
                        fullWidth
                        value={description}
                        onChange={handleDescriptionChange}
                        variant="standard" />
                </DialogContent>
                <DialogActions style={{ marginTop: 30 }}>
                    <Stack direction="row" spacing={3}>
                        <Button onClick={handleclose} variant="contained" startIcon={<CancelIcon />} style={{ backgroundColor: '#f44336', color: '#FFF', textTransform: 'capitalize' }}>Cancel</Button>
                        <Button onClick={handleadd} variant="contained" disabled={!(name && city && location && capacity)} startIcon={<SaveIcon />} style={{ backgroundColor: !(name && city && location && capacity) ? 'gray' : '#4caf50', color: '#FFF', textTransform: 'capitalize' }}>Save</Button>
                    </Stack>
                </DialogActions>
            </Dialog >
        </>

    );
}
