import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextFieldItem from './textField';
import MenuItem from '@mui/material/MenuItem';

export default function DialogBox(props) {
    const { open, maxWidth, handleadd, handleclose, ...fullWidth } = props;
    //const [error,setError]=React.useState(true);
    const [descriptionValue, setDescriptionValue] = React.useState();
    const [building, setBuilding] = React.useState('building-a');
    const [deviceType, setDeviceType] = React.useState('temp');
    const [protocol, setProtocol] = React.useState('http');

    const Assets= [
        {
            value: 'building-a',
            label: 'Building A',
        },
        {
            value: 'building-b',
            label: 'Building B',
        }, {
            value: 'building-c',
            label: 'Building C',
        }, {
            value: 'building-d',
            label: 'Building D',
        }, {
            value: 'building-e',
            label: 'Building E',
        },
    ];
    const deviceTypes = [
        {
            value: 'temp',
            label: 'Temperature',
        },
        {
            value: 'hum',
            label: 'Humidity',
        }, {
            value: 'temp-hum',
            label: 'Temperature & Humidity',
        },
    ];
    const protocols = [
        {
            value: 'http',
            label: 'HTTP',
        }, {
            value: 'mqtt',
            label: 'MQTT',
        },
    ];


    const handleBuildingChange = (event) => {
        setBuilding(event.target.value);
    };
    const handleDeviceTypeChange = (event) => {
        setDeviceType(event.target.value);
    };
    const handleProtocolChange = (event) => {
        setProtocol(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescriptionValue(event.target.value);
    }
    /*
    const handleErrorChange = () => {
        setError(true);
    }*/

    return (
        <Dialog open={open}
            {...fullWidth}
            maxWidth={maxWidth}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle style={{ backgroundColor: '#305680', padding: '16px', color: 'white' }}>Add new device</DialogTitle>
            <DialogContent>
                <TextFieldItem
                    id="building"
                    autoFocus
                    margin="dense"
                    select
                    fullWidth
                    variant="standard"
                    label="Select"
                    value={building}
                    onChange={handleBuildingChange}
                    helperText="Please select your building"
                    required={true}
                >
                    {Buildings.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextFieldItem>
                <TextFieldItem
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    required={true}
                    // error={true}
                    helperText="Name is required." />
                <TextFieldItem
                    autoFocus
                    margin="dense"
                    id="serial-number"
                    label="Serial Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    required={true}
                    // error={true}
                    helperText="Serial Number is required." />
                <TextFieldItem
                    id="deviceType"
                    autoFocus
                    margin="dense"
                    select
                    fullWidth
                    variant="standard"
                    label="Select"
                    value={deviceType}
                    onChange={handleDeviceTypeChange}
                    helperText="Please select your device type"
                    required={true}
                >
                    {deviceTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextFieldItem>
                <TextFieldItem
                    id="protocol"
                    autoFocus
                    margin="dense"
                    select
                    fullWidth
                    variant="standard"
                    label="Select"
                    value={protocol}
                    onChange={handleProtocolChange}
                    helperText="Please select your protocol"
                    required={true}
                >
                    {protocols.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextFieldItem>
                <TextFieldItem
                    id="description"
                    label="Description"
                    multiline
                    maxRows={10}
                    fullWidth
                    value={descriptionValue}
                    onChange={handleDescriptionChange}
                    variant="standard" />
            </DialogContent>
            <DialogActions style={{ marginTop: 30, borderTop: '1px solid #D3D3D3' }}>
                <Button onClick={handleclose} style={{ textTransform: 'capitalize' }}>Cancel</Button>
                <Button onClick={handleadd} style={{ backgroundColor: '#305680', color: 'white', textTransform: 'capitalize' }}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}