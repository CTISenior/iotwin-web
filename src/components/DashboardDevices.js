import { Container, Grid, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import DeviceCard from './DeviceCard';
import { SnackbarProvider } from 'notistack';
import io from 'socket.io-client';
import Button from '@mui/material/Button';
import BackspaceIcon from '@mui/icons-material/Backspace';
const socket = io("http://176.235.202.77:4001/", { transports: ['websocket', 'polling', 'flashsocket'] })



const DashboardDevices = (props) => {
    const { tenantID } = props;
    const [devices, setDevices] = React.useState([]);
    const [topics, setTopics] = React.useState([]);
    const [graphList, setGraphList] = React.useState([]);
    const getTenantDevices = () => {
        const tempDevices = [];
        const tempTopics = [];
        const tempGraphList = [];

        axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/devices`).then((response) => {
            if (response != null) {
                response.data.forEach(element => {
                    const temp = {
                        assetName: element.asset_name,
                        id: element.id,
                        name: element.name,
                        sn: element.sn,
                        types: element.types
                    };
                    tempDevices.push(temp);
                    tempTopics.push(element.sn);
                    // tempGraphList.push({ id: element.sn, temperature: [], humidity: [] });
                });
                // setGraphList(tempGraphList);
                setTopics(tempTopics);
                setDevices(tempDevices);
            }
        }).catch((error) => {
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

    React.useEffect(() => {
        getTenantDevices();
    }, []);


    function sendGraphList(id) {
        return graphList.filter(item => item.id === id ? item : "");
    }
    return (
        <Container>
            <SnackbarProvider maxSnack={3}>
                <Paper sx={{ p: 3 }} elevation={3}>
                    <Typography variant="modal" sx={{ fontSize: "30px", display: 'flex', justifyContent: 'center', marginBottom: 2 }}>All Devices</Typography>
                    <Grid container spacing={3}>

                        {devices.map(element => {
                            return (
                                < DeviceCard name={element.name} id={element.id} sn={element.sn} assetName={element.assetName} types={element.types} socket={socket} list={sendGraphList(element.id)} />
                            );
                        })}
                    </Grid>
                </Paper>
            </SnackbarProvider>

        </Container >
    )
}

export default DashboardDevices