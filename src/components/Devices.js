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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import conf from '../conf.json';
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
    const [selectedRowMinTemp, setSelectedRowMinTemp] = useState();
    const [selectedRowMinHum, setSelectedRowMinHum] = useState();
    const [selectedRowMaxTemp, setSelectedRowMaxTemp] = useState();
    const [selectedRowMaxHum, setSelectedRowMaxHum] = useState();
    const [selectedRowSn, setSelectedRowSn] = useState();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState();

    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
    }
    const handleOpenAdd = () => {
        setOpenAddDialog(true);
    }
    const snackbarClose = (event) => {
        setSnackbarOpen(false);
        setSnackbarMessage(null);
    }
    const getDevices = () => {
        axios.get(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/tenants/${tenantID}/devices`)
            .then((response) => {
                // Success 🎉
                let temp = [];
                response.data.forEach(elm => {
                    const data = [elm.id, elm.sn, elm.name, elm.model, elm.protocol, elm.sensor_types.join(', '), elm.min_values.join(' - '), elm.max_values.join(' - '), elm.description, elm.asset_id, elm.asset_name];
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
        { name: 'SN', options: { display: false, viewColumns: false, filter: false } },
        { name: 'Name' },
        {
            name: 'Model', options: {
                setCellProps: value => ({ style: { textTransform: 'capitalize', width: '11%' } }),
            }
        },
        { name: 'Protocol' },
        { name: 'Sensor Types' },
        { name: 'Min Values' },
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
                            <>
                                <Tooltip title="View">
                                    <IconButton disabled={props.isCreator} sx={{ color: 'primary.main' }} href={`/dashboard/monitor/${tableData[rowIndex][0]}`} >
                                        <RemoveRedEyeSharpIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton disabled={props.isObserver} sx={{ color: '#14a37f' }} onClick={() => {
                                        const rowValue = tableData[rowIndex];
                                        setSelectedRow(rowValue);
                                        const minValues = rowValue[6];
                                        let splitMinValues = minValues.split("-");
                                        if (splitMinValues[0] !== undefined)
                                            setSelectedRowMinTemp(splitMinValues[0].trim());
                                        else
                                            setSelectedRowMinTemp(null);
                                        if (splitMinValues[1] !== undefined)
                                            setSelectedRowMinHum(splitMinValues[1].trim());
                                        else
                                            setSelectedRowMinHum(null);
                                        const maxValues = rowValue[7];
                                        let splitMaxValues = maxValues.split("-");
                                        if (splitMaxValues[0] !== undefined)
                                            setSelectedRowMaxTemp(splitMaxValues[0].trim());
                                        else
                                            setSelectedRowMaxTemp(null);
                                        if (splitMaxValues[1] !== undefined)
                                            setSelectedRowMaxHum(splitMaxValues[1].trim());
                                        else
                                            setSelectedRowMaxHum(null);
                                        setOpenEditDialog(true);
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton disabled={props.isObserver} sx={{ color: '#f44336' }} onClick={() => {
                                        setSelectedRowId(tableData[rowIndex][0]);
                                        setSelectedRowName(tableData[rowIndex][2]);
                                        setOpenDeleteDialog(true);
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Copy Device Serial No">
                                    <IconButton disabled={props.isObserver} sx={{ color: '#000' }}
                                        onClick={() => {
                                            setSelectedRowSn(tableData[rowIndex][1]);
                                            setSnackbarColor('#4caf50');
                                            setSnackbarOpen(true);
                                            setSnackbarMessage("Copied to clipboard")
                                            navigator.clipboard.writeText(selectedRowSn);
                                        }}>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        </Box >
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
            <Snackbar
                open={snackbarOpen}
                onClose={snackbarClose}
                autoHideDuration={3000}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: snackbarColor,
                    }}
                    message={snackbarMessage}
                    action={[
                        <Tooltip title="Close">
                            <IconButton
                                key='close'
                                aria-label='Close'
                                color='inherit'
                                onClick={snackbarClose}
                            >x</IconButton>
                        </Tooltip>
                    ]}
                />
            </Snackbar>
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
            <AddDialog open={openAddDialog} setOpenAddDialog={setOpenAddDialog} fullWidth={true} maxWidth='md' tenantID={tenantID} setIsChange={setIsChange} />
            <EditDeviceDialog open={openEditDialog} setOpenEditDialog={setOpenEditDialog} fullWidth={true} maxWidth='md' setSelectedRow={setSelectedRow} selectedRow={selectedRow} setIsChange={setIsChange} selectedRowMinTemp={selectedRowMinTemp} selectedRowMinHum={selectedRowMinHum} selectedRowMaxTemp={selectedRowMaxTemp} selectedRowMaxHum={selectedRowMaxHum} tenantID={tenantID} />
            <DeleteDeviceDialog open={openDeleteDialog} handleclose={handleCloseDelete} fullWidth={false} maxWidth='md'
                selectedRowId={selectedRowId} selectedRowName={selectedRowName} setIsChange={setIsChange} />
        </>
    )
}
export default Devices