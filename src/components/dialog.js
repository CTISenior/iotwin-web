import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextFieldItem from './TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

export default function DialogBox(props) {
    const { open, maxWidth, tenantID, handleclose, ...fullWidth } = props;
    //const [error,setError]=React.useState(true);
    const [descriptionValue, setDescriptionValue] = React.useState('');
    const [maxTemp, setMaxTemp] = React.useState(0);
    const [maxHum, setMaxHum] = React.useState(0);
    const [deviceName, setDeviceName] = React.useState('');
    const [building, setBuilding] = React.useState('building-a');
    const [deviceType, setDeviceType] = React.useState('temp');
    const [protocol, setProtocol] = React.useState('http');
    const [deviceSn, setDeviceSn] = React.useState('');
    const [model, setModel] = React.useState('');
    const Assets = [
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
    const handleMaxTempValueChange = (event) => {
        setMaxTemp(event.target.value);
    }
    const handleMaxHumValueChange = (event) => {
        setMaxHum(event.target.value);
    }
    const handleDeviceNameChange = (event) => {
        setDeviceName(event.target.value);
    }
    const handleDeviceSnChange = (event) => {
        setDeviceSn(event.target.value);
    }
    const handleModelChange = (event) => {
        setModel(event.target.value);
    }
    /*
    const handleErrorChange = () => {
        setError(true);
    }*/

    const handleadd = async () => {


        await axios.post('http://176.235.202.77:4000/api/v1/devices/', {

            "sn": deviceSn,
            "name": deviceName,
            "protocol": protocol,
            "model": model,
            "types": ["temperature"],
            "max_values": [maxTemp, maxHum],
            "description": descriptionValue,
            "asset_id": null,
            "tenant_id": tenantID
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                    {Assets.map((option) => (
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
                    value={deviceName}
                    onChange={handleDeviceNameChange}
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
                    value={deviceSn}
                    onChange={handleDeviceSnChange}
                    required={true}
                    // error={true}
                    helperText="Serial Number is required." />
                <TextFieldItem
                    autoFocus
                    margin="dense"
                    id="model"
                    label="Model"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={model}
                    onChange={handleModelChange}
                />
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
                <TextFieldItem
                    id="maxValuesTemp"
                    label="Max Temperature Values"
                    type="number"
                    autoFocus
                    fullWidth
                    variant="standard"
                    value={maxTemp}
                    onChange={handleMaxTempValueChange}
                    margin="normal" />
                <TextFieldItem
                    id="maxValuesHum"
                    label="Max Humidity Values"
                    type="number"
                    autoFocus
                    fullWidth
                    variant="standard"
                    value={maxHum}
                    onChange={handleMaxHumValueChange}
                    margin="normal" />
            </DialogContent>
            <DialogActions style={{ marginTop: 30, borderTop: '1px solid #D3D3D3' }}>
                <Button onClick={handleclose} style={{ textTransform: 'capitalize' }}>Cancel</Button>
                <Button onClick={handleadd} style={{ backgroundColor: '#305680', color: 'white', textTransform: 'capitalize' }}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}