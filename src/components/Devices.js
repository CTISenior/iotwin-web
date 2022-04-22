import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import AddDialog from './dialog';


const Devices = (props) => {
    const { tenantID } = props;
    const devices = [];
    const [tableData, setTableData] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const handleclose = () => {
        setOpenAddDialog(false);
    };
    const handleOpen = () => {
        setOpenAddDialog(true);
    }
    useEffect(() => {
        axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/devices`)
            .then((response) => {
                // Success 🎉
                let temp = [];
                response.data.forEach(elm => {
                    //const data = { id: element.id, asset_id: element.asset_id, sn: element.sn, name: element.name, protocol: element.protocol, types: element.types, max_values: element.max_values, description: element.description };
                    const data = [elm.id, elm.sn, elm.name, elm.model, elm.protocol, elm.types.join('-'), elm.max_values.join('-'), elm.description, elm.asset_id];
                    temp.push(data);
                });
                setTableData(temp);
                //devices = response.data
                console.log(devices);
                console.log(tableData);
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
    }, [])


    const columns = [
        { name: 'ID', options: { display: false, viewColumns: false, filter: false } },
        { name: 'SN' },
        { name: 'Name' },
        { name: 'Model' },
        { name: 'Protocol' },
        { name: 'Types' },
        { name: 'Max Values' },
        { name: 'Description' },
        { name: 'Asset', options: { display: true } }
    ]


    const options = {
        filterType: 'checkbox',
        //onRowClick: handleRowClick,// row
    };


    return (

        <>

            <MUIDataTable
                title={'Device List'}
                data={tableData}
                columns={columns}
                options={options}
            />

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color='secondary' aria-label='add'>
                    <IconButton onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                </Fab>
            </Box>
            <AddDialog open={openAddDialog} handleclose={handleclose} fullWidth={true} tenantID={tenantID} maxWidth='md' />
        </>
    )
}

export default Devices