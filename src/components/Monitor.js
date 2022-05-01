import { Container, Grid, Paper, Tab, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import LineChart from './LineChart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import SensorsSharpIcon from "@mui/icons-material/SensorsSharp";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import io from 'socket.io-client';
const socket = io("http://176.235.202.77:4001/", { transports: ['websocket', 'polling', 'flashsocket'] })


const temp = [];
const hum = [];
const tempLabel = [];

const Monitor = (props) => {
    const { tenantID, name, building_id, types } = useParams()
    const [selectedTab, setSelectedTab] = useState("1");
    const [disconnect, setDisconnect] = useState(false);
    const [updateHeat, setUpdateHeat] = useState(0);
    const [updateHum, setUpdateHum] = useState(0);
    const test = 1;

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
        setDisconnect(true);
    }
    React.useEffect(() => {
        socket.emit("telemetry_topic", tenantID);
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
            console.log(temp);
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

    return (
        <React.Fragment>

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
                                        <Box flexDirection={"row"}>
                                            <Typography variant="modal">ID:</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {tenantID}
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
                                        <Box flexDirection={"row"}>
                                            <Typography variant="modal">Name:</Typography>
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
                                        <Box flexDirection={"row"}>
                                            <Typography variant="modal">Types:</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
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
                                        <Box flexDirection={"row"}>
                                            <Typography variant="modal">Building:</Typography>
                                            <Typography
                                                mx={1}
                                                variant="side"
                                                sx={{ color: "primary.main" }}
                                            >
                                                {building_id}
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
                                            <LineChart id={tenantID} types={types} chart={tempChart} />
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
                                            <LineChart id={tenantID} types={types} chart={humChart} />
                                        </Box>
                                    </Paper>
                                </Grid>
                            }


                        </Grid >
                    </Paper>

                </TabPanel>
                <TabPanel value="2">

                </TabPanel>
                <TabPanel value="3">
                    Hello
                </TabPanel>

            </TabContext>
        </React.Fragment>
    )
}

export default Monitor