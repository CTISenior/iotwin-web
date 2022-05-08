import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddDialog from './AddDeviceDialog';
import EditDeviceDialog from './EditDeviceDialog';
import DeleteDeviceDialog from './DeleteDevice';
import Tooltip from '@mui/material/Tooltip';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';

const Devices = (props) => {
    const { tenantID } = props;
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(0);
    const [selectedRowName, setSelectedRowName] = useState('');
    const [isChange, setIsChange] = useState(false);
    const [selectedRowMaxTemp, setSelectedRowMaxTemp] = useState(0);
    const [selectedRowMaxHum, setSelectedRowMaxHum] = useState(0);
    const [selectedDeviceType, setSelectedDeviceType] = useState([]);

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
    const getDevices = () => {
        axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/devices`)
            .then((response) => {
                // Success 🎉
                let temp = [];
                response.data.forEach(elm => {
                    //const data = { id: element.id, asset_id: element.asset_id, sn: element.sn, name: element.name, protocol: element.protocol, types: element.types, max_values: element.max_values, description: element.description };
                    const data = [elm.id, elm.sn, elm.name, elm.model, elm.protocol, elm.sensor_types.join(' & '), elm.max_values.join(' - '), elm.description, elm.asset_id, elm.asset_name,];
                    temp.push(data);
                });
                setTableData(temp);
                setIsChange(false);
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
        console.log("Table data is : " + tableData);
    }

    useEffect(() => {
        getDevices();
    }, [])
    useEffect(() => {
        if (isChange)
            getDevices();
    }, [isChange])

    const columns = [
        { name: 'ID', options: { display: false, viewColumns: false, filter: false } },
        { name: 'SN' },
        { name: 'Name' },
        { name: 'Model' },
        { name: 'Protocol' },
        { name: 'Types' },
        { name: 'Max Values' },
        { name: 'Description' },
        { name: 'Asset ID', options: { display: false, viewColumns: false, filter: false } },
        { name: 'Asset Name' },
        {
            name: 'Action', options: {
                customBodyRenderLite: (rowIndex) => {
                    return (
                        <Box display={'flex'}
                            flexDirection={'row'}>
                            <Tooltip title="View">
                                <IconButton sx={{ color: 'primary' }} href={`/dashboard/monitor/${tableData[rowIndex][0]}`} >
                                    <RemoveRedEyeSharpIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton sx={{ color: '#14a37f' }} onClick={() => {
                                    const rowValue = tableData[rowIndex];
                                    setSelectedRow(rowValue);
                                    console.log(rowValue);
                                    const maxValues = rowValue[6];
                                    let splitMaxValues = maxValues.split("-");
                                    if (splitMaxValues[0] !== undefined)
                                        setSelectedRowMaxTemp(splitMaxValues[0].trim());
                                    else
                                        setSelectedRowMaxTemp(0);
                                    if (splitMaxValues[1] !== undefined)
                                        setSelectedRowMaxHum(splitMaxValues[1].trim());
                                    else
                                        setSelectedRowMaxHum(0);
                                    let deviceType = rowValue[5];
                                    let splitDeviceType = [];
                                    let trimmedDeviceType = [];
                                    if (deviceType.includes('&')) {
                                        splitDeviceType = deviceType.split('&');
                                        trimmedDeviceType = splitDeviceType.map(element => {
                                            return element.trim();
                                        });
                                    }
                                    else {
                                        splitDeviceType = deviceType.split(' ');
                                        trimmedDeviceType = splitDeviceType.map(element => {
                                            return element.trim();
                                        });
                                    }
                                    setSelectedDeviceType(trimmedDeviceType);
                                    setOpenEditDialog(true);
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton sx={{ color: '#f44336' }} onClick={() => {
                                    //const rowValue = tableData[rowIndex];
                                    console.log(tableData[rowIndex][1]);
                                    setSelectedRowId(tableData[rowIndex][0]);
                                    setSelectedRowName(tableData[rowIndex][2]);
                                    setOpenDeleteDialog(true);
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

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
            <Box sx={{ '& > :not(style)': { m: 1, float: 'right', marginRight: 3 } }} >
                <Tooltip title="Add">
                    <Fab color='info' aria-label='add'>
                        <IconButton color='inherit' onClick={handleOpenAdd}>
                            <AddIcon />
                        </IconButton>
                    </Fab>
                </Tooltip>
            </Box>
            <AddDialog open={openAddDialog} handleclose={handleCloseAdd} fullWidth={true} maxWidth='md' tenantID={tenantID} setIsChange={setIsChange} />
            <EditDeviceDialog open={openEditDialog} handleclose={handleCloseEdit} fullWidth={true} maxWidth='md' selectedRow={selectedRow} setIsChange={setIsChange} selectedRowMaxTemp={selectedRowMaxTemp} selectedRowMaxHum={selectedRowMaxHum} selectedDeviceType={selectedDeviceType} tenantID={tenantID} />
            <DeleteDeviceDialog open={openDeleteDialog} handleclose={handleCloseDelete} fullWidth={false} maxWidth='md'
                selectedRowId={selectedRowId} selectedRowName={selectedRowName} setIsChange={setIsChange} />
        </>
    )
}
export default Devices