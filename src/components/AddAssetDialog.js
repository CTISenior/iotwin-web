import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextFieldItem from './TextField';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import axios from 'axios';

export default function AddDialogBox(props) {
    const { open, maxWidth, tenantID, handleclose, ...fullWidth } = props;
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [location, setLocation] = useState(null);
    const [coordinate, setCoordinate] = useState(null);
    const [description, setDescription] = useState(null);
    const [closeModel, setCloseModel] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleCoordinateChange = (event) => {
        setCoordinate(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }



    const handleadd = async () => {
        await axios.post('http://176.235.202.77:4000/api/v1/assets/', {
            "name": name,
            "city": city,
            "location": location,
            "coordinates": coordinate,
            "description": description,
            "tenant_id": tenantID
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setName(null);
                setCity(null);
                setLocation(null);
                setCoordinate(null);
                setDescription(null);
                handleclose();
            }, 1000)
    }

    return (
        <Dialog open={open}
            {...fullWidth}
            maxWidth={maxWidth}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle style={{ backgroundColor: '#305680', padding: '16px', color: 'white' }}>Add new device</DialogTitle>
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
                    id="coordinate"
                    label="Coordinate"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={coordinate}
                    onChange={handleCoordinateChange}
                    required={true}
                    // error={true}
                    helperText="Coordinates is required." />
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
                    <Button onClick={handleclose} variant="contained" startIcon={<CancelIcon />} style={{ backgroundColor: '#FF0000', color: '#FFF', textTransform: 'capitalize' }}>Cancel</Button>
                    <Button onClick={handleadd} variant="contained" disabled={!(name && city && location && coordinate)} startIcon={<SaveAltIcon />} style={{ backgroundColor: !(name && city && location && coordinate) ? 'gray' : '#228B22', color: '#FFF', textTransform: 'capitalize' }}>Save</Button>
                </Stack>
            </DialogActions>
        </Dialog >
    );
}
