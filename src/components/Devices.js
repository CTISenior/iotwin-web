import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddDialog from './dialog';
import EditDeviceDialog from './EditDeviceDialog';
import DeleteDeviceDialog from './DeleteDevice';

const Devices = (props) => {
    const { tenantID } = props;
    const devices = [];
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(0);
    const [selectedRowName, setSelectedRowName] = useState("");

    const handleCloseAdd = () => {
        setOpenAddDialog(false);
    };
    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    }
    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
    }
    const handleOpenAdd = () => {
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
        { name: 'Asset', options: { display: true } },
        {
            name: 'Action', options: {
                customBodyRenderLite: (rowIndex) => {
                    return (
                        <>
                            <IconButton onClick={() => {
                                const rowValue = tableData[rowIndex];
                                setSelectedRow(rowValue);
                                setOpenEditDialog(true);
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton cnClick={() => {
                                const rowValue = tableData[rowIndex];
                                console.log(rowValue);
                                setSelectedRowId(rowValue[0]);
                                console.log(selectedRowId);
                                setSelectedRowName(rowValue[2]);
                                console.log(selectedRowName);
                                setOpenDeleteDialog(true);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </>

                    )
                }
            }
        }
    ]


    const options = {
        filterType: 'checkbox',
        responsive: "scroll"
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
                    <IconButton onClick={handleOpenAdd}>
                        <AddIcon />
                    </IconButton>
                </Fab>
            </Box>
            <AddDialog open={openAddDialog} handleclose={handleCloseAdd} fullWidth={true} maxWidth='md' tenantID={tenantID} />
            <EditDeviceDialog open={openEditDialog} handleclose={handleCloseEdit} fullWidth={true} maxWidth='md' selectedRow={selectedRow} tenantID={tenantID} />
            <DeleteDeviceDialog open={openDeleteDialog} handleclose={handleCloseDelete} fullWidth={true} maxWidth='md'
                selectedRowId={selectedRowId} selectedRowName={selectedRowName} tenantID={tenantID} />
        </>
    )
}

export default Devices