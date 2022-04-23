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
import Tooltip from '@mui/material/Tooltip';

const Devices = (props) => {
    const { tenantID } = props;
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(0);
    const [selectedRowName, setSelectedRowName] = useState('');
    const [selectedRowSn, setSelectedRowSn] = useState('');

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
    }, [tableData])


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
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Edit">
                                <IconButton color='warning' onClick={() => {
                                    const rowValue = tableData[rowIndex];
                                    console.log(rowValue);
                                    setSelectedRow(rowValue);
                                    setOpenEditDialog(true);
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton color='error' onClick={() => {
                                    //const rowValue = tableData[rowIndex];
                                    console.log(tableData[rowIndex][1]);
                                    setSelectedRowId(tableData[rowIndex][0]);
                                    setSelectedRowSn(tableData[rowIndex][1]);
                                    setSelectedRowName(tableData[rowIndex][2]);
                                    setOpenDeleteDialog(true);
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>

                    )
                }
            }
        }
    ]


    const options = {
        filterType: 'select',
        //responsive: "scroll"
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

            <Box sx={{ '& > :not(style)': { m: 1 } }} style={{ float: 'right', marginRight: 22 }}>
                <Tooltip title="Add">
                    <Fab color='success' aria-label='add'>
                        <IconButton color='inherit' onClick={handleOpenAdd}>
                            <AddIcon />
                        </IconButton>
                    </Fab>
                </Tooltip>
            </Box>
            <AddDialog open={openAddDialog} handleclose={handleCloseAdd} fullWidth={true} maxWidth='md' tenantID={tenantID} />
            <EditDeviceDialog open={openEditDialog} handleclose={handleCloseEdit} fullWidth={true} maxWidth='md' selectedRow={selectedRow} />
            <DeleteDeviceDialog open={openDeleteDialog} handleclose={handleCloseDelete} fullWidth={false} maxWidth='md'
                selectedRowId={selectedRowId} selectedRowName={selectedRowName} selectedRowSn={selectedRowSn} />
        </>
    )
}

export default Devices