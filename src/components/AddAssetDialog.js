import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextFieldItem from './TextField';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SnackbarContent from '@mui/material/SnackbarContent';

export default function AddDialogBox(props) {
    const { open, maxWidth, setIsChange, tenantID, setOpenAddDialog, ...fullWidth } = props;
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [location, setLocation] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const [description, setDescription] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState();

    const snackbarClose = (event) => {
        setSnackbarOpen(false);
        setSnackbarMessage(null);
    }
    const handleclose = (event) => {
        setOpenAddDialog(false);
        setName(null);
        setCity(null);
        setLocation(null);
        setCapacity(null);
        setDescription(null);
        setSnackbarOpen(null);
        setSnackbarMessage(null);
    }
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
        await axios.post('http://176.235.202.77:4000/api/v1/assets/', {
            "name": name,
            "city": city,
            "location": location,
            "capacity": capacity,
            "description": description,
            "tenant_id": tenantID
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
                setSnackbarMessage('New asset could not inserted successfully')
            })
            .finally(() => {
                setName(null);
                setCity(null);
                setLocation(null);
                setCapacity(null);
                setDescription(null);
                setTimeout(function () {
                    handleclose();
                }, 300)

            })
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
            <Dialog open={open}
                {...fullWidth}
                maxWidth={maxWidth}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle style={{ backgroundColor: '#305680', padding: '16px', color: 'white' }}>Add New Asset</DialogTitle>
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
                        label="Capacity"
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
