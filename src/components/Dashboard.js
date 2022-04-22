import { Container, Grid } from '@mui/material'
import axios from 'axios';
import React from 'react'
import DeviceCard from './DeviceCard';
import { SnackbarProvider } from 'notistack';
import io from 'socket.io-client';
const socket = io("http://176.235.202.77:4001/", { transports: ['websocket', 'polling', 'flashsocket'] })



const Dashboard = (props) => {
    const { tenantID } = props;
    const [devices, setDevices] = React.useState([]);
    const [topics, setTopics] = React.useState([]);
    const [graphList, setGraphList] = React.useState([]);

    // React.useEffect(() => {
    //     console.log("New list is : " + JSON.stringify(graphList));
    // }, [graphList])

    // React.useEffect(() => {
    //     if (topics.length > 0) {
    //         socket.emit("telemetry_topic", topics);
    //         socket.on("telemetry_topic_message", function (msg, topic) {
    //             let info = JSON.parse(msg);
    //             console.log("topic is : " + topic);
    //             setGraphList(graphList.map(item => item.id === topic ? { ...item, temperature: [info.values.temperature], humidity: [info.values.humidity] } : { ...item, temperature: null, humidity: null }))
    //         });
    //     }
    // }, [topics]);

    React.useEffect(async () => {
        const tempDevices = [];
        const tempTopics = [];
        const tempGraphList = [];

        axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/devices`).then((response) => {
            if (response != null) {
                response.data.forEach(element => {
                    const temp = { name: element.name, id: element.sn, building_id: element.building_id, types: element.types };
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
    }, []);


    function sendGraphList(id) {
        return graphList.filter(item => item.id === id ? item : "");
    }
    return (
        <Container>
            <SnackbarProvider maxSnack={3}>

                <Grid container spacing={3}>

                    {devices.map(element => {
                        return (
                            <DeviceCard name={element.name} id={element.id} building_id={element.building_id} types={element.types} socket={socket} list={sendGraphList(element.id)} />
                        );
                    })}
                </Grid>
            </SnackbarProvider>

        </Container>
    )
}

export default Dashboard