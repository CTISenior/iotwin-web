import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

import {
    Container,
    Paper,
    Grid,
    Typography,
} from "@mui/material";
import TextFieldItem from './TextField';

const Settings = (props) => {
    const { tenantID } = props;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [tenantName, setTenantName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [tenantCount, setTenantCount] = useState(0);


    const snackbarClose = (event) => {
        setSnackbarOpen(false);
        setSnackbarMessage(null);
    }

    const handleAdd = async () => {
        await axios.post('http://176.235.202.77:4000/api/v1/tenants/', {
            "realm_id": "ctis",
            "client_id": "test",
            "name": tenantName,
            "country": country,
            "city": city,
            "address": address,
            "postcode": postcode,
            "email": email,
            "phone": phone,
            "description": description
        })
            .then(function (response) {
                console.log(response);
                setSnackbarOpen(true);
                setSnackbarMessage(response.data)
            })
            .catch(function (error) {
                console.log(error);
                setSnackbarOpen(true);
                setSnackbarMessage('The tenant could not added successfully')
            })
    }

    const handleUpdate = async () => {
        await axios.put('http://176.235.202.77:4000/api/v1/tenants/' + tenantID, {
            "name": tenantName,
            "country": country,
            "city": city,
            "address": address,
            "postcode": postcode,
            "email": email,
            "phone": phone,
            "description": description,
        })
            .then(function (response) {
                console.log(response);
                setSnackbarOpen(true);
                setSnackbarMessage(response.data)
            })
            .catch(function (error) {
                console.log(error);
                setSnackbarOpen(true);
                setSnackbarMessage('The tenant could not updated successfully');
            });
    }

    const getSettings = () => {
        axios
            .get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}`)
            .then((response) => {
                // Success 🎉
                console.log(response.data);
                setAddress(response.data.address);
                setCity(response.data.city);
                setEmail(response.data.email);
                setDescription(response.data.description);
                setPhone(response.data.phone);
                setPostcode(response.data.postcode);
                setCountry(response.data.country);
                setTenantName(response.data.name);
                setTenantCount(Object.keys(response.data).length);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };
    useEffect(() => {
        getSettings();
    }, []);

    const handleTenantNameChange = (event) => {
        setTenantName(event.target.value);
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handlePostcodeChange = (event) => {
        setPostcode(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    return (
        <Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={snackbarClose}
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
            <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                Tenant Settings
            </Typography>
            <Grid container spacing={2} xs={12} width={1}>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Realm ID:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '67%' }}>
                                <TextFieldItem
                                    autoFocus
                                    id="realmId"
                                    type="text"
                                    variant="standard"
                                    value={tenantID}
                                    disabled />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Client ID:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '67%' }}>
                                <TextFieldItem
                                    autoFocus
                                    id="clientId"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={tenantID}
                                    disabled />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Tenant ID:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '54%' }}>
                                <TextFieldItem
                                    autoFocus
                                    id="tenantName"
                                    placeholder="CTIS"
                                    type="text"
                                    variant="standard"
                                    value={tenantName}
                                    onChange={handleTenantNameChange}
                                />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Country:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '100%' }}>
                                <TextFieldItem
                                    autoFocus
                                    id="country"
                                    type="text"
                                    placeholder="Turkey"
                                    fullWidth
                                    variant="standard"
                                    value={country}
                                    onChange={handleCountryChange} />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">City:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '100%' }}>
                                <TextFieldItem
                                    autoFocus
                                    id="city"
                                    placeholder="Ankara"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={city}
                                    onChange={handleCityChange} />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Address:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '100%' }}>
                                <TextFieldItem
                                    autoFocus
                                    id="address"
                                    placeholder="Address"
                                    multiline
                                    maxRows={10}
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={address}
                                    onChange={handleAddressChange} />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Postcode:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '100%' }}>
                                <TextFieldItem
                                    autoFocus
                                    placeholder="34379"
                                    id="postcode"
                                    pattern="[0-9]*"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={postcode}
                                    onChange={handlePostcodeChange} />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Email:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '100%' }}>
                                <TextFieldItem
                                    autoFocus
                                    placeholder="test@gmail.com"
                                    id="email"
                                    type="email"
                                    fullWidth
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    variant="standard"
                                    value={email}
                                    onChange={handleEmailChange} />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Phone:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '100%' }}>
                                <TextFieldItem
                                    autoFocus
                                    placeholder="05xx-xxx-xx-xx"
                                    id="phone"
                                    type="tel"
                                    pattern="[0-9]{4}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                    fullWidth
                                    variant="standard"
                                    value={phone}
                                    onChange={handlePhoneChange} />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ bgcolor: "white", marginTop: 5 }} elevation={3}>
                        <Box
                            p={1}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                        >
                            <Typography variant="modal">Description:</Typography>
                            <Typography variant="modal" sx={{ marginLeft: 1, width: '100%' }}>
                                <TextFieldItem
                                    id="description"
                                    placeholder="Description"
                                    multiline
                                    maxRows={10}
                                    fullWidth
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    variant="standard" />
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    sx={{ justifyContent: "right", display: "flex" }}
                >
                    <Tooltip title={tenantCount > 0 ? "Update" : "Save"}>
                        <Button onClick={tenantCount > 0 ? handleUpdate : handleAdd} variant="contained" startIcon={<SaveAltIcon />} style={{ backgroundColor: '#228B22', color: '#FFF', textTransform: 'capitalize' }}>{tenantCount > 0 ? "Update" : "Save"}</Button>
                    </Tooltip>

                </Grid>
            </Grid>
        </Container>
    );
}
export default Settings;