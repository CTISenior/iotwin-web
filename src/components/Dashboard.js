import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp";
import SensorsSharpIcon from "@mui/icons-material/SensorsSharp";
import MUIDataTable from "mui-datatables";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Dashboard = (props) => {
  const { tenantID } = props;
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalDevice, setTotalDevice] = useState(0);
  const [age, setAge] = useState(0);
  const [telemetry, setTelemetry] = useState(0);
  const [latestAlerts, setLatestAlerts] = useState([]);
  const [latestTelemetry, setLatestTelemetry] = useState([]);
  const [alertCount, setAlertCount] = useState([]);
  const [telemetryCount, setTelemetryCount] = useState([]);
  const [isChange, setIsChange] = useState(false);

  const getDashboard = () => {
    axios
      .get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/dashboard`)
      .then((response) => {
        // Success 🎉
        console.log(response.data);
        setIsChange(false);
        setTotalAssets(response.data.assetCount);
        setTotalDevice(response.data.deviceCount);
        let alerts = [];
        let telemetry = [];
        let alertCount = [];
        let telemetryCount = [];

        response.data.latestAlerts.forEach((elm) => {
          const data = [
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(elm.timestamp),
            elm.message,
            elm.sn,
            elm.status,
            elm.telemetry_key,
            elm.type,
          ];
          alerts.push(data);
        });
        setLatestAlerts(alerts);
        response.data.latestTelemetry.forEach((elm) => {
          const data = [
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(elm.timestamp),
            elm.sn,
            elm.value.humidity,
            elm.value.temperature,
          ];
          telemetry.push(data);
        });
        setLatestTelemetry(telemetry);

        const alert = [
          { value: response.data.alertCount.daily_count, text: "Daily Alerts" },
          {
            value: response.data.alertCount.weekly_count,
            text: "Weekly Alerts",
          },
          {
            value: response.data.alertCount.monthly_count,
            text: "Monthly Alerts",
          },
          {
            value: response.data.alertCount.yearly_count,
            text: "Yearly Alerts",
          },
        ];
        alert.map((item) => alertCount.push(item));
        console.log(alertCount);
        setAlertCount(alertCount);

        const telemetryData = [
          {
            value: response.data.telemetryCount.daily_count,
            text: "Daily Telemetry",
          },
          {
            value: response.data.telemetryCount.weekly_count,
            text: "Weekly Telemetry",
          },
          {
            value: response.data.telemetryCount.monthly_count,
            text: "Monthly Telemetry",
          },
          {
            value: response.data.telemetryCount.yearly_count,
            text: "Yearly Telemetry",
          },
        ];
        telemetryData.map((item) => telemetryCount.push(item));
        console.log(telemetryCount);
        setTelemetryCount(telemetryCount);
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
  const handleChange = (event) => {
    setIsChange(true);
    setAge(event.target.value);
  };

  const handleTelemetryChange = (event) => {
    setIsChange(true);
    setTelemetry(event.target.value);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  useEffect(() => {
    if (isChange) {
      getDashboard();
    }
  }, [isChange]);

  const alertsColumn = [
    { name: "Created At" },
    { name: "Message" },
    { name: "Device Sn" },
    { name: "Status", options: { display: false } },
    { name: "Telemetry Key" },
    { name: "Type" },
  ];
  const telemetryColumn = [
    { name: "Created At" },
    { name: "Device Sn" },
    {
      name: "Temperature Value", options: {
        setCellProps: value => ({ style: { textAlign: 'center' } }),
      }
    },
    {
      name: "Humidity Value", options: {
        setCellProps: value => ({ style: { textAlign: 'center' } }),
      }
    },
  ];
  const options = {
    filter: false,
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    download: false,
    tableBodyHeight: "300px",
    print: false,
    selectableRows: "none",
    selectableRowsHeader: false,
    viewColumns: false,
    textLabels: {
      body: {
        noMatch: "Sorry, no matching records found"
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
    },
  };

  return (
    <Container>
      <Grid container spacing={2} xs={12} width={1}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ bgcolor: "white" }} elevation={3}>
            <Box
              p={1}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <ApartmentSharpIcon
                sx={{ fontSize: "6rem", color: "primary.main" }}
              />
              <Box flexDirection={"row"}>
                <Typography variant="modal">Total Asset:</Typography>
                <Typography
                  mx={1}
                  variant="side"
                  sx={{ color: "primary.main" }}
                >
                  {totalAssets}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ bgcolor: "white" }} elevation={3}>
            <Box
              p={1}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <SensorsSharpIcon
                sx={{ fontSize: "6rem", color: "primary.main" }}
              />
              <Box flexDirection={"row"}>
                <Typography variant="modal">Total Device:</Typography>
                <Typography
                  mx={1}
                  variant="side"
                  sx={{ color: "primary.main" }}
                >
                  {totalDevice}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ bgcolor: "white" }} elevation={3}>
            <Box
              p={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
            >
              <NotificationsIcon
                sx={{ fontSize: "5rem", color: "primary.main" }}
              />
              <FormControl variant="standard" sx={{ marginTop: "25px" }}>
                <InputLabel>Total Alerts</InputLabel>
                <Select
                  labelId="select-demo"
                  id="select-totalAlert"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  label="Select Total Alert"
                >
                  {alertCount.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              p={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <Typography variant="modal">Total Alerts: </Typography>
              <Typography
                mx={1}
                variant="side"
                sx={{ color: "primary.main", marginTop: "5px" }}
              >
                {age}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ bgcolor: "white" }} elevation={3}>
            <Box
              p={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
            >
              <ApartmentSharpIcon
                sx={{ fontSize: "5rem", color: "primary.main" }}
              />
              <FormControl variant="standard" sx={{ marginTop: "25px" }}>
                <InputLabel>Total Telemetry</InputLabel>
                <Select
                  labelId="select-Telemetry"
                  id="select-totalTelemetry"
                  value={telemetry}
                  onChange={handleTelemetryChange}
                  autoWidth
                  label="Select Total Telemetry"
                >
                  {telemetryCount.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              p={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <Typography
                variant="modal"
                sx={{ fontSize: "21px", marginTop: "5px" }}
              >
                Total Telemetry:{" "}
              </Typography>
              <Typography
                mx={1}
                variant="side"
                sx={{
                  fontSize: "1em",
                  color: "primary.main",
                  marginTop: "12px",
                }}
              >
                {telemetry}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} xs={12} width={1} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={6} lg={6}>
          <MUIDataTable
            title={"Latest Alerts"}
            data={latestAlerts}
            columns={alertsColumn}
            options={options}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MUIDataTable
            title={"Latest Telemetry"}
            data={latestTelemetry}
            columns={telemetryColumn}
            options={options}
          />
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{ justifyContent: "center", display: "flex", marginTop: 5 }}
      >
        <Button
          href="/dashboard/devices"
          variant="contained"
          startIcon={<VisibilityIcon />}
          style={{ color: "#FFF" }}
        >
          View All Devices
        </Button>
      </Grid>
    </Container>
  );
};

export default Dashboard;
