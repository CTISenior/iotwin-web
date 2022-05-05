import { React, useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Tab, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from 'axios';
import DeviceCard from './DeviceCard';

function AssetsDevices(props) {
    const { isCreator } = props;
    const { id } = useParams();
    const [devices, setDevices] = useState([]);
    const [selectedTab, setSelectedTab] = useState("1");
    const getAssetDevices = () => {
        const tempDevices = [];
        const tempTopics = [];
        const tempGraphList = [];

        axios.get(`http://176.235.202.77:4000/api/v1/assets/${id}/devices`).then((response) => {
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
                    // tempGraphList.push({ id: element.sn, temperature: [], humidity: [] });
                });
                // setGraphList(tempGraphList);
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


    useEffect(() => {
        getAssetDevices();
    }, []);


    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Container>
            <TabContext value={selectedTab}>
                <TabList onChange={handleChange}>
                    <Tab label='Devices' value='1'></Tab>
                    <Tab label='Alerts' value='2'></Tab>
                    <Tab label='Telemetry' value='3'></Tab>
                </TabList>

                <TabPanel value="1">
                    <Container>
                        <Grid container spacing={3}>
                            {devices.map(element => {
                                return (
                                    < DeviceCard name={element.name} isCreator={isCreator} />
                                );
                            })}
                        </Grid>
                    </Container>
                </TabPanel>
                <TabPanel value="2">Latest Alert</TabPanel>
                <TabPanel value="3">Latest Telemetries</TabPanel>
            </TabContext>
        </Container>
    );
}

export default AssetsDevices;