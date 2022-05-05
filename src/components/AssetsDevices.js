import { React, useState } from "react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Tab } from "@mui/material";

function AssetsDevices() {

    const [selectedTab, setSelectedTab] = useState("1");


    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Container>
            <TabContext value={selectedTab}>

                <TabList onChange={handleChange}>
                    <Tab label='Dashboard' value='1'></Tab>
                    <Tab label='Alerts' value='2'></Tab>
                    <Tab label='Telemetry' value='3'></Tab>
                </TabList>

                <TabPanel value="1">Devices</TabPanel>
                <TabPanel value="2">Latest Alert</TabPanel>
                <TabPanel value="3">Latest Telemetries</TabPanel>
            </TabContext>
        </Container>
    );
}

export default AssetsDevices;