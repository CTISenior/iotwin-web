import { Container, Grid, Paper, Tab, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import LineChart from './LineChart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import SensorsSharpIcon from "@mui/icons-material/SensorsSharp";
import MUIDataTable from "mui-datatables";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import io from 'socket.io-client';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const socket = io("http://176.235.202.77:4001/", { transports: ['websocket', 'polling', 'flashsocket'] })


const temp = [];
const hum = [];
const tempLabel = [];

const Monitor = (props) => {
    const { id, name, building_id, types, sn } = useParams()
    const [selectedTab, setSelectedTab] = useState("1");
    const [updateHeat, setUpdateHeat] = useState(0);
    const [updateHum, setUpdateHum] = useState(0);
    const [latestAlerts, setLatestAlerts] = useState([]);
    const [latestTelemetry, setLatestTelemetry] = useState([]);


    const getAlerts = () => {
        axios.get(`http://176.235.202.77:4000/api/v1/devices/${id}/alerts?days=14`)
            .then((response) => {
                let alerts = [];
                response.data.forEach((elm) => {
                    const data = [
                        new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }).format(elm.timestamp),
                        elm.message,
                        elm.sn,
                        elm.status,
                        elm.telemetry_key,
                        elm.type,
                    ];
                    alerts.push(data);
                });
                setLatestAlerts(alerts);
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

    const getTelemetries = () => {
        axios.get(`http://176.235.202.77:4000/api/v1/devices/${id}/telemetry?days=14`)
            .then((response) => {
                let telemetry = [];
                // console.log(JSON.stringify(response.data));
                response.data.forEach((elm) => {
                    const data = [
                        new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }).format(elm.timestamp),
                        elm.sn,
                        elm.value.humidity,
                        elm.value.temperature,
                    ];
                    telemetry.push(data);
                });
                setLatestTelemetry(telemetry);
                console.log(telemetry);
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



    const [tempChart, setTempChart] = useState({
        labels: [],
        datasets: [
            {
                label: "Temperature",
                data: [],
                borderColor: "#FF0000",
                fill: true,
            },

        ],
    })
    const [humChart, setHumChart] = useState({
        labels: [],
        datasets: [
            {
                label: "Humidity",
                data: [],
                borderColor: "#3e95cd",
                fill: true,
            },
        ],
    })

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }
    React.useEffect(() => {
        getAlerts();
        //  getTelemetries();
        socket.emit("telemetry_topic", sn);
        socket.on("telemetry_topic_message", function (msg) {

            let info = JSON.parse(msg);
            const date = new Date();
            if (tempLabel.length > 15) {
                tempLabel.shift();
                if (temp.length > 0)
                    temp.shift();
                if (hum.length > 0)
                    hum.shift();
            }
            temp.push(Number(info.values.temperature).toFixed(2));
            hum.push(Number(info.values.humidity).toFixed(2));
            setUpdateHeat(hum);
            tempLabel.push(date.getHours() + ":" + date.getMinutes());
            setUpdateHum((prev) => prev + 1);

        });
    }, []);

    React.useEffect(() => {
        setTempChart({
            labels: tempLabel,
            datasets: [
                {
                    label: "Temperature",
                    data: temp,
                    borderColor: "#FF0000",
                    fill: true,
                },

            ],
        });
    }, [updateHeat])
    React.useEffect(() => {
        setHumChart({
            labels: tempLabel,
            datasets: [
                {
                    label: "Humidity",
                    data: hum,
                    borderColor: "#3e95cd",
                    fill: true,
                },
            ],
        });
    }, [updateHum])

    const alertsColumn = [
        { name: "Created At" },
        { name: "Message" },
        { name: "Device Sn" },
        { name: "Status", options: { display: false } },
        { name: "Telemetry Key" },
        { name: "Type" },
    ];
    const telemetryColumn = [
        { name: "Created At" },
        { name: "Device Sn" },
        {
            name: "Temperature Value", options: {
                setCellProps: value => ({ style: { textAlign: 'left' } }),
            }
        },
        {
            name: "Humidity Value", options: {
                setCellProps: value => ({ style: { textAlign: 'left' } }),
            }
        },
    ];
    const options = {
        filter: false,
        responsive: "standard",
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20],
        download: false,
        tableBodyHeight: "300px",
        print: false,
        selectableRows: "none",
        selectableRowsHeader: false,
        viewColumns: false,
        textLabels: {
            body: {
                noMatch: "Sorry, no matching records found"
            },
            pagination: {
                next: "Next Page",
                previous: "Previous Page",
                rowsPerPage: "Rows per page:",
                displayRows: "of",
            },
        },
    };


    return (
        <Container>
            <Grid item xs={12} md={6} lg={6} sx={{ marginBottom: 2 }}>
                <Button href="/dashboard/devices" variant="contained"
                    startIcon={<ArrowBackIcon style={{ borderRight: '1px solid white', borderRightWidth: '1px' }} />} style={{ color: '#FFF' }}>
                    Back to Devices
                </Button>
            </Grid>

            <TabContext value={selectedTab}>

                <TabList onChange={handleChange}>
                    <Tab label='Dashboard' value='1'></Tab>
                    <Tab label='Latest Alerts' value='2'></Tab>
                    <Tab label='Latest Telemetries' value='3'></Tab>
                </TabList>

                <TabPanel value="1">
                    <Paper sx={{ mt: 2, p: 5, bgcolor: "primary.main" }} elevation={3}>

                        <Grid container spacing={2} xs={12} width={1}>
                            <Grid item xs={12} md={6} lg={3}>
                                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <SensorsSharpIcon
                                            sx={{ fontSize: "6rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">ID</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {sn}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <SensorsSharpIcon
                                            sx={{ fontSize: "6rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Name</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <SensorsSharpIcon
                                            sx={{ fontSize: "6rem", color: "primary.main" }}
                                        />
                                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                            <Typography variant="modal">Types</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main", textTransform: 'capitalize' }}
                                            >
                                                {types.replace(',', '&')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <SensorsSharpIcon
                                            sx={{ fontSize: "6rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Building</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {building_id === 'undefined' ? 'Not Assigned' : ''}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {types.includes('temperature') &&
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={3}>
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                            alignItems={'center'}
                                        >
                                            <LineChart id={sn} types={types} chart={tempChart} />
                                        </Box>
                                    </Paper>
                                </Grid>
                            }
                            {types.includes('humidity') &&
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={3}>
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                            alignItems={'center'}
                                        >
                                            <LineChart id={sn} types={types} chart={humChart} />
                                        </Box>
                                    </Paper>
                                </Grid>
                            }


                        </Grid >
                    </Paper>

                </TabPanel>
                <TabPanel value="2">
                    <Grid container spacing={2} xs={12} width={1} sx={{ marginTop: 1 }}>
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={"Latest Alerts"}
                                data={latestAlerts}
                                columns={alertsColumn}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value="3">
                    <Grid container spacing={2} xs={12} width={1} sx={{ marginTop: 1 }}>
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={"Latest Telemetry"}
                                data={latestTelemetry}
                                columns={telemetryColumn}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>

            </TabContext>
        </Container>
    )
}

export default Monitor