import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import axios from "axios";
import conf from '../../../conf.json'
import {
  Button,
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import PlotContainer from "../containers/PlotContainer";

const DataSelectionStep = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const getDevices = () => {
    axios
      .get(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/tenants/ctis/devices`)
      .then((response) => {
        // Success 🎉
        let temp = [];
        response.data.forEach((elm) => {
          const data = { id: elm.id, name: elm.name, types: elm.sensor_types };
          temp.push(data);
        });
        console.log(temp);
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
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  React.useEffect(() => {
    getDevices();
  }, []);

  return (
    <Box sx={{ mt: 2, p: 3 }}>
      <Grid
        sx={{ boxShadow: 5, p: 2, bgcolor: "white" }}
        container
        spacing={2}
        xs={12}
        width={1}
      >
        <Grid item xs={12} md={4}>
          <Box>
            <TextField
              id="selectedURL"
              select
              label="Select the Data"
              fullWidth
              value={props.url}
              onChange={(e) => props.handleURLChanged(e.target.value)}
            >
              {tableData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <TextField
              id="selectedType"
              select
              label="Select the Type"
              fullWidth
              value={props.type}
              onChange={(e) => props.handleTypeChanged(e.target.value)}
            >
              {tableData
                .filter((tableData) => tableData.id == props.url)
                .map((option) =>
                  option.types.map((elem) => (
                    <MenuItem key={elem} value={elem}>
                      {elem}
                    </MenuItem>
                  ))
                )}
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <TextField
              id="selectedType"
              select
              label="Select the Type"
              fullWidth
              value={props.type}
              onChange={(e) => props.handleTypeChanged(e.target.value)}
            >
              {tableData
                .filter((tableData) => tableData.id == props.url)
                .map((option) =>
                  option.types.map((elem) => (
                    <MenuItem key={elem} value={elem}>
                      {elem}
                    </MenuItem>
                  ))
                )}
            </TextField>
          </Box>
        </Grid>

        <Box sx={{ m: 2 }}>
          <Tooltip title="Fetch">
            <Button
              color="primary"
              onClick={(e) => props.handleFetch()}
              variant="contained"
            >
              Fetch
            </Button>
          </Tooltip>
        </Box>
      </Grid>

      {props.tsData != "" && (
        <Grid
          container
          sx={{ mt: 2, boxShadow: 5, p: 2, bgcolor: "white" }}
          spacing={2}
          xs={12}
          width={1}
        >
          <Grid item xs={12}>
            <Box>
              <PlotContainer data={props.tsData} />
            </Box>
          </Grid>
        </Grid>
      )}

      <Box sx={{ mt: 2, float: "right" }}>
        <Button disabled onClick={props.handleBack} variant="contained">
          Back
        </Button>
        {props.fetched ? (
          <Button
            color="primary"
            onClick={props.handleNext}
            variant="contained"
          >
            Next
          </Button>
        ) : (
          <Button
            disabled
            color="primary"
            onClick={props.handleNext}
            variant="contained"
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DataSelectionStep;
