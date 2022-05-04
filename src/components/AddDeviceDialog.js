import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextFieldItem from './TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import SnackbarContent from '@mui/material/SnackbarContent';
import axios from 'axios';


export default function DialogBox(props) {
    const { open, maxWidth, setIsChange, tenantID, handleclose, ...fullWidth } = props;
    //const [error,setError]=React.useState(true);
    const [descriptionValue, setDescriptionValue] = useState();
    const [maxTemp, setMaxTemp] = useState(0);
    const [maxHum, setMaxHum] = useState(0);
    const [deviceName, setDeviceName] = useState();
    const [asset, setAsset] = useState();
    const [deviceType, setDeviceType] = useState([]);
    const [protocol, setProtocol] = useState();
    const [deviceSn, setDeviceSn] = useState();
    const [model, setModel] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState();
    const [assetName, setAssetName] = useState([]);

    const snackbarClose = (event) => {
        setSnackbarOpen(false);
        setSnackbarMessage(null);
    }
    const deviceTypes = [
        {
            value: 'temperature',
            label: 'Temperature',
        },
        {
            value: 'humidity',
            label: 'Humidity',
        }, {
            value: 'temperature,humidity',
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


    const handleAssetChange = (event) => {
        setAsset(event.target.value);
    };
    const handleDeviceTypeChange = (event) => {
        if (event.target.value.includes(','))
            setDeviceType(event.target.value.split(','));
        else
            setDeviceType(event.target.value.split(' '));
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
    const getAssetsName = () => {
        axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/assets`)
            .then((response) => {
                // Success 🎉
                let temp = [];
                response.data.forEach(elm => {
                    const data = {
                        id: elm.id,
                        name: elm.name,
                    };
                    temp.push(data);
                });
                setAssetName(temp);
                console.log(temp)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    useEffect(() => {
        getAssetsName();
    }, []);

    const handleadd = async () => {
        await axios.post('http://176.235.202.77:4000/api/v1/devices/', {
            "sn": deviceSn,
            "name": deviceName,
            "protocol": protocol,
            "model": model,
            "types": deviceType,
            "max_values": [maxTemp, maxHum],
            "description": descriptionValue,
            "asset_id": asset,
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
                setSnackbarMessage('New device could not inserted successfully')
            })

            .finally(() => {
                setDeviceSn(null);
                setDeviceName(null);
                setProtocol(null);
                setAsset(null);
                setMaxTemp(null);
                setModel(null);
                setMaxHum(null);
                setDeviceType(null);
                setDescriptionValue(null);
                setTimeout(function () {
                    handleclose();
                }, 500)
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
                <DialogTitle style={{ backgroundColor: '#305680', padding: '16px', color: 'white' }}>Add new device</DialogTitle>
                <DialogContent>
                    <TextFieldItem
                        id="asset"
                        autoFocus
                        margin="dense"
                        select
                        fullWidth
                        variant="standard"
                        label="Select"
                        value={asset}
                        onChange={handleAssetChange}
                        helperText="Please select your asset"
                        required={true}
                    >
                        {assetName.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
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
                <DialogActions style={{ marginTop: 30 }}>
                    <Stack direction="row" spacing={3}>
                        <Button onClick={handleclose} variant="contained" startIcon={<CancelIcon />} style={{ backgroundColor: '#f44336', color: '#FFF', textTransform: 'capitalize' }}>Cancel</Button>
                        <Button onClick={handleadd} variant="contained" disabled={!(asset && deviceName && deviceSn && deviceType && protocol)} startIcon={<SaveIcon />} style={{ backgroundColor: !(asset && deviceName && deviceSn && deviceType && protocol) ? 'gray' : '#4caf50', color: '#FFF', textTransform: 'capitalize' }}>Save</Button>
                    </Stack>
                </DialogActions>
            </Dialog >
        </>
    );
}