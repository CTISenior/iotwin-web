import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAssetDialog from './AddAssetDialog';
import EditAssetDialog from './EditAssetDialog';
import DeleteAssetDialog from './DeleteAssetDialog';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { Typography } from '@mui/material'
import conf from '../conf.json';


const Assets = (props) => {
    const tenantID = props.tenantID;
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(0);
    const [selectedRowName, setSelectedRowName] = useState('');
    const [isChange, setIsChange] = useState(false);

    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
    }
    const handleOpenAdd = () => {
        setOpenAddDialog(true);
    }
    const getAssets = () => {
        axios.get(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/tenants/${tenantID}/assets`)
            .then((response) => {
                // Success 🎉
                let temp = [];
                response.data.forEach(elm => {
                    const data = [elm.id, elm.name, elm.city, elm.location, elm.capacity, elm.description, elm.tenant_id];
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
        getAssets();
    }, []);
    useEffect(() => {
        if (isChange)
            getAssets();
    }, [isChange]);
    const options = {
        filterType: 'checkbox',
    };
    const columns = [
        { name: 'ID', options: { display: false, viewColumns: false, filter: false } },
        { name: 'Name' },
        { name: 'City' },
        { name: 'Location' },
        {
            name: 'Capacity (m²)', options: {
                customBodyRender: (val) => {
                    return (
                        <Typography>{val} m²</Typography>
                    )
                }

            }
        },
        { name: 'Description' },
        {
            name: 'Action', options: {
                customBodyRenderLite: (rowIndex) => {
                    return (
                        <Box display={'flex'}
                            flexDirection={'row'}>
                            <Tooltip title="View">
                                <IconButton disabled={props.isCreator} sx={{ color: 'primary.main' }} href={`/assets/devices/${tableData[rowIndex][0]}`} >
                                    <RemoveRedEyeSharpIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton disabled={props.isObserver} sx={{ color: '#14a37f' }}
                                    onClick={() => {
                                        const rowValue = tableData[rowIndex];
                                        setSelectedRow(rowValue);
                                        setOpenEditDialog(true);
                                    }}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton disabled={props.isObserver} sx={{ color: '#f44336' }}
                                    onClick={() => {
                                        setSelectedRowId(tableData[rowIndex][0]);
                                        setSelectedRowName(tableData[rowIndex][1]);
                                        setOpenDeleteDialog(true);
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box >
                    )
                },
                setCellHeaderProps: value => ({ style: { display: 'flex', justifyContent: 'left' } }),
            }
        }
    ]
    return (
        <>
            <MUIDataTable
                title={"Asset List"}
                data={tableData}
                columns={columns}
                options={options}
            />
            <Box sx={{ '& > :not(style)': { m: 1, float: 'right', marginRight: 14 } }}>
                <Tooltip title="Add">
                    <Fab color='info' aria-label='add'>
                        <IconButton color='inherit' onClick={handleOpenAdd}>
                            <AddIcon />
                        </IconButton>
                    </Fab>
                </Tooltip>
            </Box>
            <AddAssetDialog open={openAddDialog} setOpenAddDialog={setOpenAddDialog} fullWidth={true} maxWidth='md' tenantID={tenantID} setIsChange={setIsChange} />
            <EditAssetDialog open={openEditDialog} setOpenEditDialog={setOpenEditDialog} fullWidth={true} maxWidth='md' setSelectedRow={setSelectedRow} selectedRow={selectedRow} setIsChange={setIsChange} />
            <DeleteAssetDialog open={openDeleteDialog} handleclose={handleCloseDelete} fullWidth={false} maxWidth='md'
                selectedRowId={selectedRowId} selectedRowName={selectedRowName} setIsChange={setIsChange} />
        </>
    )
}
export default Assets;