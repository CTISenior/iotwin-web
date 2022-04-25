import React, { useState, useEffect } from 'react';
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
import AlertComponent from './Alert';

export default function AddDialogBox(props) {
    const { open, maxWidth, tenantID, selectedRow, handleclose, ...fullWidth } = props;
    const [id, setID] = useState();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [location, setLocation] = useState('');
    const [coordinate, setCoordinate] = useState('');
    const [description, setDescription] = useState('');
    const [responseAlert, setResponseAlert] = useState('');

    useEffect(() => {
        setID(selectedRow[0]);
        setName(selectedRow[1]);
        setCity(selectedRow[2]);
        setLocation(selectedRow[3]);
        setCoordinate(selectedRow[4]);
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
    const handleCoordinateChange = (event) => {
        setCoordinate(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleadd = async () => {
        await axios.put('http://176.235.202.77:4000/api/v1/assets/' + id, {
            "name": name,
            "city": city,
            "location": location,
            "coordinates": coordinate,
            "description": description,
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                setResponseAlert(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(handleclose)
    }

    return (
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
            <DialogActions style={{ marginTop: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {responseAlert && <AlertComponent message={responseAlert ? responseAlert : ''}
                    type={'info'} />}

                <Stack direction="row" spacing={3}>
                    <Button onClick={handleclose} variant="contained" startIcon={<CancelIcon />} style={{ backgroundColor: '#FF0000', color: '#FFF', textTransform: 'capitalize' }}>Cancel</Button>
                    <Button onClick={handleadd} variant="contained" disabled={!(name && city && location && coordinate)} startIcon={<SaveAltIcon />} style={{ backgroundColor: !(name && city && location && coordinate) ? 'gray' : '#228B22', color: '#FFF', textTransform: 'capitalize' }}>Save</Button>
                </Stack>
            </DialogActions>
        </Dialog >
    );
}
