import {
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp";
import SensorsSharpIcon from "@mui/icons-material/SensorsSharp";
import MUIDataTable from "mui-datatables";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge';
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Moment from 'react-moment';

const Dashboard = (props) => {
  const { tenantID } = props;
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalDevice, setTotalDevice] = useState(0);
  const [latestAlerts, setLatestAlerts] = useState([]);
  const [latestTelemetry, setLatestTelemetry] = useState([]);
  const [dailyAlert, setDailyAlert] = useState(0);
  const [weeklyAlert, setWeeklyAlert] = useState(0);
  const [monthlyAlert, setMonthlyAlert] = useState(0);
  const [yearlyAlert, setYearlyAlert] = useState(0);
  const getDashboard = () => {
    axios
      .get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/dashboard`)
      .then((response) => {
        // Success 🎉
        console.log(response.data);
        setTotalAssets(response.data.entityCount.asset_count);
        setTotalDevice(response.data.entityCount.device_count);
        let alerts = [];
        let telemetry = [];
        response.data.latestAlerts.forEach((elm) => {
          const data = [
            elm.timestamptz,
            elm.message,
            elm.device_name,
            elm.status,
            elm.telemetry_key,
            elm.severity,
          ];
          alerts.push(data);
        });
        setLatestAlerts(alerts);
        response.data.latestTelemetry.forEach((elm) => {
          const data = [
            elm.timestamptz,
            elm.device_name,
            JSON.stringify(elm.values)
          ];
          telemetry.push(data);
        });
        setLatestTelemetry(telemetry);
        setDailyAlert(response.data.allalertsCount.daily_count);
        setWeeklyAlert(response.data.allalertsCount.weekly_count);
        setMonthlyAlert(response.data.allalertsCount.monthly_count);
        setYearlyAlert(response.data.allalertsCount.yearly_count);
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

  useEffect(() => {
    getDashboard();
  }, []);

  useEffect(() => {
    setInterval(function tick() {
      getDashboard();
    }, 10000)
  }, []);



  const alertsColumn = [
    {
      name: "Created At", options: {
        customBodyRender: (val) => {
          return (
            <Moment format='Do MMMM YYYY, h:mm:ss a'>{val}</Moment>
          )
        }
      }
    },
    { name: "Message" },
    { name: "Device Name" },
    {
      name: "Status", options: {
        customBodyRender: (val) => {
          return (
            <Badge badgeContent={val === false ? "active" : "cleared"}
              color={val === false ? "info" : "secondary"}
              overlap="circular"
              sx={{ "& .MuiBadge-badge": { fontSize: 12, height: 30, width: 55, padding: 1, textTransform: 'capitalize', marginRight: 1 } }}
            />
          )
        },
        setCellProps: value => ({
          style: {
            textAlign: 'center',
          }
        })
      }
    },
    { name: "Telemetry Key", options: { display: false, viewColumns: false, filter: false } },
    {
      name: "Severity", options: {
        customBodyRender: (val) => {
          return (
            <Badge badgeContent={val}
              color={val === 'warning' ? "warning" : "error"}
              overlap="circular"
              sx={{ "& .MuiBadge-badge": { fontSize: 12, height: 30, width: 55, padding: 1, textTransform: 'capitalize', marginRight: 1 } }}

            />
          )
        },
        setCellProps: value => ({
          style: {
            textAlign: 'center',
          }
        })
      }
    },
  ];
  const telemetryColumn = [
    {
      name: "Created At", options: {
        customBodyRender: (val) => {
          return (
            <Moment format='Do MMMM YYYY, h:mm:ss a'>{val}</Moment>
          )
        }
      }
    },
    { name: "Device Name" },
    {
      name: "Values", options: {
        setCellProps: value => ({ style: { textAlign: 'center' } }),
      }
    }
  ];
  const options = {
    filter: false,
    responsive: "standard",
    rowsPerPage: 20,
    rowsPerPageOptions: [20],
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
              <AccountBalanceIcon
                sx={{ fontSize: "6rem", color: "primary.main" }}
              />
              <Box flexDirection={"row"}>
                <Typography variant="modal">Tenant Name:</Typography>
                <Typography
                  mx={1}
                  variant="side"
                  sx={{ color: "primary.main", textTransform: 'uppercase' }}
                >
                  {tenantID}
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
              justifyContent={"space-evenly"}
            >
              <NotificationsIcon
                sx={{ fontSize: "3rem", color: "primary.main", marginTop: 5 }}
              />
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
              >
                <Grid
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  mb={1}
                  mt={1}
                >
                  <Typography variant="modal" sx={{ fontSize: "15px" }}>Daily Alert:</Typography>
                  <Typography
                    mx={1}
                    variant="side"
                    sx={{ color: "primary.main", fontSize: "15px" }}
                  >
                    {dailyAlert}
                  </Typography>
                </Grid>
                <Grid
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  mb={1}
                >
                  <Typography variant="modal" sx={{ fontSize: "15px" }}>Weekly Alert:</Typography>
                  <Typography
                    mx={1}
                    variant="side"
                    sx={{ color: "primary.main", fontSize: "15px" }}
                  >
                    {weeklyAlert}
                  </Typography>
                </Grid>
                <Grid
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  mb={1}
                >
                  <Typography variant="modal" sx={{ fontSize: "15px" }}>Monthly Alert:</Typography>
                  <Typography
                    mx={1}
                    variant="side"
                    sx={{ color: "primary.main", fontSize: "15px" }}
                  >
                    {monthlyAlert}
                  </Typography>
                </Grid>
                <Grid
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  mb={1}
                >
                  <Typography variant="modal" sx={{ fontSize: "15px" }}>Yearly Alert:</Typography>
                  <Typography
                    mx={1}
                    variant="side"
                    sx={{ color: "primary.main", fontSize: "15px" }}
                  >
                    {yearlyAlert}
                  </Typography>
                </Grid>
              </Box>
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
    </Container >
  );
};

export default Dashboard;
