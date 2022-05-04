import { Grid, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';

export default function DeviceCard(props) {

    const { name, id, assetName, types } = props;
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <SensorsSharpIcon sx={{ fontSize: 100, color: 'first.main' }} />
                    <Typography>
                        {name}
                    </Typography>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Tooltip title="Display Device Details">
                            <IconButton variant='modal' aria-label="display" href={`/dashboard/monitor/${id}/${name}/${assetName}/${types}/`}>
                                <ShowChartIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Grid >
    );
}