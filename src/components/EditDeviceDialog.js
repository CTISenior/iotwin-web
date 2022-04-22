import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextFieldItem from './TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

export default function EditDeviceDialog(props) {
    const { open, maxWidth, tenantID, selectedRow, handleclose, ...fullWidth } = props;
    const [descriptionValue, setDescriptionValue] = useState('');
    const [id, setID] = useState();
    const [maxTemp, setMaxTemp] = useState(0);
    const [maxHum, setMaxHum] = useState(0);
    const [deviceName, setDeviceName] = useState('');
    const [deviceType, setDeviceType] = useState('temp');
    const [protocol, setProtocol] = useState('http');
    const [deviceSn, setDeviceSn] = useState('');
    const [model, setModel] = useState('');
    const [assetId, setAssetId] = useState();

    useEffect(() => {
        setID(selectedRow[0]);
        setDeviceSn(selectedRow[1]);
        setDeviceName(selectedRow[2]);
        setModel(selectedRow[3]);
        setProtocol(selectedRow[4]);
        setDeviceType(selectedRow[5]);
        setDescriptionValue(selectedRow[7]);
        setAssetId(selectedRow[8]);
    }, [selectedRow]);
    const handleadd = async () => {
        console.log(id) //selected row id
        console.log(selectedRow); //selected row data can be observed 
        await axios.put('http://176.235.202.77:4000/api/v1/devices/' + id, {
            "sn": deviceSn,
            "name": deviceName,
            "protocol": protocol,
            "model": model,
            "types": ["temperature"],
            "max_values": [maxTemp, maxHum],
            "description": descriptionValue,
            "asset_id": assetId,
            "tenant_id": tenantID
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(handleclose);
    }
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
    return (
        <Dialog open={open}
            {...fullWidth}
            maxWidth={maxWidth}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle style={{ backgroundColor: '#305680', padding: '16px', color: 'white' }}>Edit Device name</DialogTitle>
            <DialogContent>
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
                    id="model"
                    label="Model"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={model}
                    onChange={handleModelChange} />
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
                    required={true}>
                    {deviceTypes.map((option) => (
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
                <Button onClick={handleadd} style={{ backgroundColor: '#305680', color: 'white', textTransform: 'capitalize' }}>Edit</Button>
            </DialogActions>
        </Dialog>
    );
}
