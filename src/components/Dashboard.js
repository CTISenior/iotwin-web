import { Container, Grid } from '@mui/material'
import axios from 'axios';
import React from 'react'
import DeviceCard from './DeviceCard';


const devices = [];

axios.get('http://176.235.202.77:4000/api/v1/devices')
    .then((response) => {
        // Success 🎉
        console.log(response);
        response.data.forEach(element => {
            const temp = { name: element.name, type: "Temperature", id: element.sn, building_id: element.building_id };
            devices.push(temp);
        });
        console.log(devices);
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

function AllDevices(props) {

    return <>
        {devices.map(element => {
            return (
                <DeviceCard name={element.name} id={element.id} building_id={element.building_id} />
            );
        })}
    </>

}

const Dashboard = (props) => {
    const { notificationCount } = props;

    return (
        <Container>
            <Grid container spacing={3}>
                <AllDevices />
            </Grid>
        </Container>
    )
}

export default Dashboard