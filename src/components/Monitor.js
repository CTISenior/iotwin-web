import { Container, FormControl, Grid, MenuItem, InputLabel, Select, Paper, Tab, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import LineChart from './LineChart';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SensorsSharpIcon from "@mui/icons-material/SensorsSharp";
import MUIDataTable from "mui-datatables";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import io from 'socket.io-client';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import NotificationsIcon from "@mui/icons-material/Notifications";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CloseIcon from '@mui/icons-material/Close';
import ClearAllDeviceAlert from './ClearAllDeviceAlert';
import DeleteAllDeviceAlert from './DeleteAllDeviceAlert';
import Moment from 'react-moment';

const socket = io("http://176.235.202.77:4001/", { transports: ['websocket', 'polling', 'flashsocket'] })
const temp = [];
const hum = [];
const tempLabel = [];

const Monitor = (props) => {
    const { sn, id, name, assetName, types } = useParams();
    const [selectedTab, setSelectedTab] = useState("1");
    const [updateHeat, setUpdateHeat] = useState(0);
    const [updateHum, setUpdateHum] = useState(0);
    const [latestAlerts, setLatestAlerts] = useState([]);
    const [latestTelemetry, setLatestTelemetry] = useState([]);
    const [dailyTelemetry, setDailyTelemetry] = useState(0);
    const [weeklyTelemetry, setWeeklyTelemetry] = useState(0);
    const [monthlyTelemetry, setMonthlyTelemetry] = useState(0);
    const [yearlyTelemetry, setYearlyTelemetry] = useState(0);
    const [dailyAlert, setDailyAlert] = useState(0);
    const [weeklyAlert, setWeeklyAlert] = useState(0);
    const [monthlyAlert, setMonthlyAlert] = useState(0);
    const [yearlyAlert, setYearlyAlert] = useState(0);
    const [activeAlertCount, setActiveAlertCount] = useState(0);
    const [alertCount, setAlertCount] = useState([]);
    const [alertValue, setAlertValue] = useState(1);
    const [isChange, setIsChange] = useState(false);
    const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);
    const [openClearAllDialog, setOpenClearAllDialog] = useState(false);
    const [snackbarColor, setSnackbarColor] = useState();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOpenClearAll = () => {
        setOpenClearAllDialog(true);
    }
    const handleOpenDeleteAll = () => {
        setOpenDeleteAllDialog(true);
    }
    const handleCloseDeleteAll = () => {
        setOpenDeleteAllDialog(false);
    }
    const handleCloseClearAll = () => {
        setOpenClearAllDialog(false);
    }
    const snackbarClose = (event) => {
        setSnackbarOpen(false);
        setSnackbarMessage(null);
    }
    const handleAlertChange = (event) => {
        setAlertValue(event.target.value);
        setIsChange(true);
    };
    const getAlerts = () => {
        let alertCount = [];
        const alert = [
            { value: 1, text: "Daily Alerts" },
            {
                value: 7,
                text: "Weekly Alerts",
            },
            {
                value: 30,
                text: "Monthly Alerts",
            },
            {
                value: 365,
                text: "Yearly Alerts",
            },
        ];
        alert.map((item) => alertCount.push(item));
        setAlertCount(alertCount);
        axios.get(`http://176.235.202.77:4000/api/v1/devices/${id}/alerts?days=${alertValue}`)
            .then((response) => {
                setIsChange(false);
                let alerts = [];
                response.data.latestAlerts.forEach((elm) => {
                    const data = [
                        elm.timestamptz,
                        elm.message,
                        elm.telemetry_key,
                        elm.status,
                        elm.type,
                        elm.id,
                    ];
                    alerts.push(data);
                });
                setLatestAlerts(alerts);
                setActiveAlertCount(response.data.activeAlertsCount);
                setDailyAlert(response.data.allAlertsCount.daily_count);
                setWeeklyAlert(response.data.allAlertsCount.weekly_count);
                setMonthlyAlert(response.data.allAlertsCount.monthly_count);
                setYearlyAlert(response.data.allAlertsCount.yearly_count);

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
        axios.get(`http://176.235.202.77:4000/api/v1/devices/${id}/telemetry?limit=200`)
            .then((response) => {
                let telemetry = [];
                console.log(response.data);
                response.data.latestTelemetry.forEach((elm) => {
                    const data = [
                        elm.timestamptz,
                        elm.value.humidity,
                        elm.value.temperature,
                    ];
                    telemetry.push(data);
                });
                setLatestTelemetry(telemetry);
                setDailyTelemetry(response.data.telemetryCount.daily_count);
                setWeeklyTelemetry(response.data.telemetryCount.weekly_count);
                setMonthlyTelemetry(response.data.telemetryCount.monthly_count);
                setYearlyTelemetry(response.data.telemetryCount.yearly_count);
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

    React.useEffect(() => {
        if (isChange)
            getAlerts();
    }, [isChange]);


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
        getTelemetries();
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

    const handleClearAlert = async (id, status) => {
        console.log(id);
        console.log(status);
        axios.put('http://176.235.202.77:4000/api/v1/alerts/' + id, {
            "status": !status
        })
            .then((response) => {
                setSnackbarColor('#4caf50');
                setIsChange(true);
                setSnackbarOpen(true);
                setSnackbarMessage(response.data)
            })
            .catch((error) => {
                setSnackbarColor('#ff5722');
                setSnackbarOpen(true);
                setIsChange(false);
                setSnackbarMessage('The alert status could not changed successfully')
            });
    }

    const handleDelete = (id) => {
        axios.delete('http://176.235.202.77:4000/api/v1/alerts/' + id)
            .then(function (response) {
                setIsChange(true);
                setSnackbarOpen(true);
                setSnackbarMessage(response.data);
                setSnackbarColor('#4caf50');
            })
            .catch(function (error) {
                setSnackbarColor('#ff5722');
                setSnackbarOpen(true);
                setIsChange(false);
                setSnackbarMessage('The alert could not deleted successfully')
            })
    }


    const alertsColumn = [
        {
            name: "Created At", options: {
                customBodyRender: (val) => {
                    return (
                        <Moment format='Do MMMM YYYY, h:mm:ss a'>{val}</Moment>
                    )
                }
            }
        },
        { name: "Message" },
        { name: "Telemetry Key" },
        {
            name: "Status", options: {
                customBodyRender: (val) => {
                    return (
                        <Badge badgeContent={val === false ? "active" : "cleared"}
                            color={val === false ? "info" : "secondary"}
                            overlap="circular"
                            sx={{ "& .MuiBadge-badge": { fontSize: 12, height: 30, width: 55, padding: 1, textTransform: 'capitalize', marginRight: 3 } }}
                        />
                    )
                },
                setCellProps: value => ({
                    style: {
                        textAlign: 'center',
                    }
                })
            }
        },
        {
            name: "Type", options: {
                customBodyRender: (val) => {
                    return (
                        <Badge badgeContent={val}
                            color={val === 'warning' ? "warning" : "error"}
                            overlap="circular"
                            sx={{ "& .MuiBadge-badge": { fontSize: 12, height: 30, width: 55, padding: 1, textTransform: 'capitalize', marginRight: 3 } }}

                        />
                    )
                },
                setCellProps: value => ({
                    style: {
                        textAlign: 'center',
                    }
                })
            }
        },
        {
            name: 'Action', options: {
                customBodyRenderLite: (rowIndex) => {
                    return (
                        <Box display={'flex'}
                            flexDirection={'row'}>
                            <Tooltip title="Clear">
                                <IconButton color='info' onClick={() => {
                                    const rowValue = latestAlerts[rowIndex];
                                    console.log(rowValue[3]);
                                    handleClearAlert(rowValue[5], rowValue[3]);
                                }}>
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton color='error' onClick={() => {
                                    const rowValue = latestAlerts[rowIndex];
                                    handleDelete(rowValue[5]);
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

                    )
                }
            }
        }
    ];
    const telemetryColumn = [
        {
            name: "Created At", options: {
                customBodyRender: (val) => {
                    return (
                        <Moment format='Do MMMM YYYY, h:mm:ss a'>{val}</Moment>
                    )
                }
            }
        },
        { name: "Device Sn", options: { display: false } },
        {
            name: "Temperature Value", options: {
                setCellProps: value => ({ style: { textAlign: 'left' } }),
                customBodyRender: (val) => {
                    return (
                        <Typography>{val}</Typography>
                    )
                },
            }
        },
        {
            name: "Humidity Value", options: {
                setCellProps: value => ({ style: { textAlign: 'left' } }),
                customBodyRender: (val) => {
                    return (
                        <Typography>{val}</Typography>
                    )
                },
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
            <Snackbar
                anchorOrigin={{
                    vertical: ' bottom',
                    horizontal: 'right'
                }}
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
            <Grid item xs={12} md={6} lg={6} sx={{ marginBottom: 2 }}>
                <Button href="/dashboard/devices" variant="contained"
                    startIcon={<ArrowBackIcon style={{ borderRight: '1px solid white', borderRightWidth: '1px' }} />} style={{ color: '#FFF' }}>
                    Back to Devices
                </Button>
            </Grid>

            <TabContext value={selectedTab}>

                <TabList onChange={handleChange}>
                    <Tab label='Dashboard' value='1'></Tab>
                    <Tab label='Alerts' value='2'></Tab>
                    <Tab label='Telemetry' value='3'></Tab>
                </TabList>

                <TabPanel value="1">
                    <Paper sx={{ mt: 2, p: 5 }} elevation={3}>

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
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Asset</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {assetName}
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
                    <Paper sx={{ p: 5 }} elevation={3}>
                        <Grid container spacing={2} xs={12} width={1} sx={{ marginBottom: 3 }}>
                            <Grid item xs={12} md={6} lg={4}>
                                <Paper elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >

                                        <NotificationsIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Active Alerts</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {activeAlertCount}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <DataUsageIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Daily</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {dailyAlert}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <DataUsageIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Weekly</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {weeklyAlert}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <DataUsageIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Monthly</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {monthlyAlert}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <DataUsageIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Yearly</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {yearlyAlert}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box>
                            <FormControl variant="standard" sx={{ marginTop: 2, width: '25%', marginBottom: 2 }}>
                                <InputLabel>Total Alerts</InputLabel>
                                <Select
                                    labelId="select-demo"
                                    id="select-totalAlert"
                                    value={alertValue}
                                    onChange={handleAlertChange}
                                    autoWidth
                                    label="Select Total Alert"
                                >
                                    {alertCount.map((option) => (
                                        <MenuItem key={option.id} value={option.value}>
                                            {option.text}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={"Latest Alerts"}
                                data={latestAlerts}
                                columns={alertsColumn}
                                options={options}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            lg={12}
                            sx={{ justifyContent: "right", display: "flex", marginTop: 2 }}
                        >
                            <Box>
                                <Tooltip title="Clear All">
                                    <Button variant="contained" onClick={handleOpenClearAll} color="info" startIcon={<ClearAllIcon />} style={{ color: '#FFF', textTransform: 'capitalize' }}>Clear All</Button>
                                </Tooltip>
                            </Box>


                            <Box sx={{ marginLeft: 2 }}>
                                <Tooltip title="Delete All">
                                    <Button variant="contained" onClick={handleOpenDeleteAll} sx={{ backgroundColor: '#f44336' }} startIcon={<CloseIcon />} style={{ color: '#FFF', textTransform: 'capitalize' }}>Delete All</Button>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Paper>
                    <ClearAllDeviceAlert open={openClearAllDialog} handleclose={handleCloseClearAll} fullWidth={true} maxWidth='md' setIsChange={setIsChange} id={id} />
                    <DeleteAllDeviceAlert open={openDeleteAllDialog} handleclose={handleCloseDeleteAll} fullWidth={true} maxWidth='md' setIsChange={setIsChange} id={id} />
                </TabPanel>
                <TabPanel value="3">
                    <Paper sx={{ p: 5 }} elevation={3}>
                        <Grid container spacing={2} xs={12} width={1} sx={{ arginBottom: 3 }}>
                            <Grid item xs={12} md={6} lg={3}>
                                <Paper elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <DataUsageIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Daily</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {dailyTelemetry}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <Paper elevation={3}>
                                    <Box
                                        p={1}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                    >
                                        <DataUsageIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Weekly</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {weeklyTelemetry}
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
                                        <DataUsageIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Monthly</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {monthlyTelemetry}
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
                                        <DataUsageIcon
                                            sx={{ fontSize: "5rem", color: "primary.main" }}
                                        />
                                        <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                                            <Typography variant="modal">Yearly</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {yearlyTelemetry}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <MUIDataTable
                                    title={"Latest Telemetries"}
                                    data={latestTelemetry}
                                    columns={telemetryColumn}
                                    options={options}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </TabPanel>

            </TabContext >
        </Container >
    )
}

export default Monitor