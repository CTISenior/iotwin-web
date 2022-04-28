import { Container, FormControl, Grid, InputLabel, Paper, Typography, Select, MenuItem } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import axios from 'axios';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Dashboard = (props) => {
    const { tenantID } = props;
    const [totalAssets, setTotalAssets] = React.useState(0);
    const [totalDevice, setTotalDevice] = React.useState(0);
    const [age, setAge] = React.useState(1);

    const getDashboard = () => {
        axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/dashboard`)
            .then((response) => {
                // Success 🎉
                console.log(response.data);
                setTotalAssets(response.data.assetCount);
                setTotalDevice(response.data.deviceCount);
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
        getDashboard();
    }, [])
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (

        <Container sx={{ mt: '5%' }}>
            <Grid container spacing={2} xs={12} width={1}>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
                        <Box p={1}
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <ApartmentSharpIcon sx={{ fontSize: "6rem", color: 'secondary.main' }} />
                            <Box
                                flexDirection={'row'}
                            >
                                <Typography variant='modal'>Total Asset:</Typography>
                                <Typography mx={1} variant='side'>{totalAssets}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
                        <Box p={1}
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <SensorsSharpIcon sx={{ fontSize: "6rem", color: 'secondary.main' }} />
                            <Box
                                flexDirection={'row'}
                            >
                                <Typography variant='modal'>Total Device:</Typography>
                                <Typography mx={1} variant='side'>{totalDevice}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>

                        <Box p={1}
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >

                            <NotificationsIcon sx={{ fontSize: "6rem", color: 'secondary.main' }} />
                            <Box
                                flexDirection={'row'}
                            >
                                <Typography variant='modal'>Total Alert Last Week: </Typography>

                            </Box>

                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
                        <Box p={1}
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <ApartmentSharpIcon sx={{ fontSize: "6rem", color: 'secondary.main' }} />
                            <Box
                                flexDirection={'row'}
                            >
                                <Typography variant='modal'>Device ID:</Typography>
                                <Typography mx={1} variant='side'>0</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

            </Grid >
        </Container >
    )
}

export default Dashboard