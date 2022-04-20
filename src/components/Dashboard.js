import { Container, Grid } from '@mui/material'
import axios from 'axios';
import React from 'react'
import DeviceCard from './DeviceCard';
import io from 'socket.io-client';
const socket = io("http://176.235.202.77:4001/", { transports: ['websocket', 'polling', 'flashsocket'] })


const temp = [];
const hum = [];
const tempLabel = [];

const Dashboard = (props) => {
    const { tenantID } = props;
    const [devices, setDevices] = React.useState([]);
    const [topics, setTopics] = React.useState([]);
    const [graphList, setGraphList] = React.useState([]);

    React.useEffect(() => {
        if (topics.length > 0) {
            socket.emit("telemetry_topic", topics);
            socket.on("telemetry_topic_message", function (msg, topic) {
                let info = JSON.parse(msg);
                console.log(info);
                const date = new Date();
                if (tempLabel.length > 15) {
                    tempLabel.shift();
                    if (temp.length > 0)
                        temp.shift();
                    if (hum.length > 0)
                        hum.shift();
                }
                const timeLabel = date.getHours() + ":" + date.getMinutes();
                setGraphList(graphList.map(item => item.id === topic ? { ...item, temperature: [...item.temperature, info.values.temperature], humidity: [...item.humidity, info.values.humidity] } : item))
                temp.push(info.values.temperature);
                hum.push(info.values.humidity);
            });
        }
    }, [topics]);

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
                    tempGraphList.push({ id: element.sn, temperature: [10], humidity: [11], label: [] });

                });
                setGraphList(tempGraphList);
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


    function AllDevices(props) {
        function sendGraphList(id) {
            return graphList.filter(item => item.id === id ? item : "");
        }
        return <>
            {devices.map(element => {
                return (
                    <DeviceCard name={element.name} id={element.id} building_id={element.building_id} types={element.types} socket={socket} list={sendGraphList(element.id)} />
                );
            })}
        </>

    }
    return (
        <Container>
            <Grid container spacing={3}>
                <AllDevices />
            </Grid>
        </Container>
    )
}

export default Dashboard