import {
  Container,
  FormControl,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  Paper,
  Tab,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import DeviceCard from "./DeviceCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import SensorsSharpIcon from "@mui/icons-material/SensorsSharp";
import MUIDataTable from "mui-datatables";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import PriorityHighTwoToneIcon from "@mui/icons-material/PriorityHighTwoTone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import ClearAllDeviceAlert from "./ClearEntityAlerts";
import DeleteAllDeviceAlert from "./DeleteEntityAlerts";
import Moment from "react-moment";
import BalanceIcon from "@mui/icons-material/Balance";
import conf from '../conf.json'
function AssetsDevices(props) {
  const { id } = useParams();
  const [devices, setDevices] = useState([]);
  const [asset, setAsset] = useState([]);
  const [selectedTab, setSelectedTab] = useState("1");
  const [latestAlerts, setLatestAlerts] = useState([]);
  const [latestTelemetry, setLatestTelemetry] = useState([]);
  const [dailyTelemetry, setDailyTelemetry] = useState(0);
  const [weeklyTelemetry, setWeeklyTelemetry] = useState(0);
  const [monthlyTelemetry, setMonthlyTelemetry] = useState(0);
  const [yearlyTelemetry, setYearlyTelemetry] = useState(0);
  const [dailyAlert, setDailyAlert] = useState(0);
  const [weeklyAlert, setWeeklyAlert] = useState(0);
  const [monthlyAlert, setMonthlyAlert] = useState(0);
  const [yearlyAlert, setYearlyAlert] = useState(0);
  const [activeAlertCount, setActiveAlertCount] = useState(0);
  const [alertCount, setAlertCount] = useState([]);
  const [alertValue, setAlertValue] = useState(1);
  const [isChange, setIsChange] = useState(false);
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);
  const [openClearAllDialog, setOpenClearAllDialog] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dailyMax, setDailyMax] = useState(0);
  const [weeklyMax, setWeeklyMax] = useState(0);
  const [monthlyMax, setMonthlyMax] = useState(0);
  const [yearlyMax, setYearlyMax] = useState(0);
  const [dailyAvg, setDailyAvg] = useState(0);
  const [weeklyAvg, setWeeklyAvg] = useState(0);
  const [monthlyAvg, setMonthlyAvg] = useState(0);
  const [yearlyAvg, setYearlyAvg] = useState(0);
  const [deviceType, setDeviceType] = useState("temperature");
  const [deviceTypes, setDeviceTypes] = useState([]);
  const handleOpenClearAll = () => {
    setOpenClearAllDialog(true);
  };
  const handleOpenDeleteAll = () => {
    setOpenDeleteAllDialog(true);
  };
  const handleCloseDeleteAll = () => {
    setOpenDeleteAllDialog(false);
  };
  const handleCloseClearAll = () => {
    setOpenClearAllDialog(false);
  };
  const snackbarClose = (event) => {
    setSnackbarOpen(false);
    setSnackbarMessage(null);
  };
  const handleAlertChange = (event) => {
    setAlertValue(event.target.value);
    setIsChange(true);
  };
  const handleDeviceTypeChange = (event) => {
    setDeviceType(event.target.value);
  };

  const getAlerts = () => {
    let alertCount = [];
    const alert = [
      { value: 1, text: "Daily Alerts" },
      {
        value: 7,
        text: "Weekly Alerts",
      },
      {
        value: 30,
        text: "Monthly Alerts",
      },
      {
        value: 365,
        text: "Yearly Alerts",
      },
    ];
    alert.map((item) => alertCount.push(item));
    setAlertCount(alertCount);
    axios
      .get(
        `${conf.backend.IP}:${conf.backend.PORT}/api/v1/assets/${id}/alerts?days=${alertValue}`
      )
      .then((response) => {
        setIsChange(false);
        let alerts = [];
        response.data.latestAlerts.forEach((elm) => {
          const data = [
            elm.timestamptz,
            elm.device_name,
            elm.message,
            elm.telemetry_key,
            elm.status,
            elm.severity,
            elm.id,
          ];
          alerts.push(data);
        });
        setLatestAlerts(alerts);
        setActiveAlertCount(response.data.activeAlertsCount);
        setDailyAlert(response.data.allAlertsCount.daily_count);
        setWeeklyAlert(response.data.allAlertsCount.weekly_count);
        setMonthlyAlert(response.data.allAlertsCount.monthly_count);
        setYearlyAlert(response.data.allAlertsCount.yearly_count);
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

  const getTelemetries = () => {
    axios
      .get(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/assets/${id}/telemetry?limit=200`)
      .then((response) => {
        let telemetry = [];
        response.data.latestTelemetry.forEach((elm) => {
          const data = [
            elm.timestamptz,
            elm.device_name,
            JSON.stringify(elm.values),
          ];
          telemetry.push(data);
        });
        setLatestTelemetry(telemetry);
        setDailyTelemetry(response.data.telemetryCount.daily_count);
        setWeeklyTelemetry(response.data.telemetryCount.weekly_count);
        setMonthlyTelemetry(response.data.telemetryCount.monthly_count);
        setYearlyTelemetry(response.data.telemetryCount.yearly_count);
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

  const getTelemetryMax = () => {
    axios
      .get(
        `${conf.backend.IP}:${conf.backend.PORT}/api/v1/assets/${id}/telemetry/max?sensorType=${deviceType}`
      )
      .then((response) => {
        setDailyMax(response.data.daily_max);
        setWeeklyMax(response.data.weekly_max);
        setMonthlyMax(response.data.monthly_max);
        setYearlyMax(response.data.yearly_max);
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
  const getTelemetryAvg = () => {
    axios
      .get(
        `${conf.backend.IP}:${conf.backend.PORT}/api/v1/assets/${id}/telemetry/avg?sensorType=${deviceType}`
      )
      .then((response) => {
        setDailyAvg(response.data.daily_avg);
        setWeeklyAvg(response.data.weekly_avg);
        setMonthlyAvg(response.data.monthly_avg);
        setYearlyAvg(response.data.yearly_avg);
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
    getTelemetryMax();
    getTelemetryAvg();
  }, [deviceType]);

  const getAssetName = () => {
    const assetInfo = [];
    axios
      .get(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/assets/${id}`)
      .then((response) => {
        if (response != null) {
          response.data.forEach((element) => {
            const temp = {
              id: element.id,
              name: element.name,
            };
            assetInfo.push(temp);
          });
          setAsset(assetInfo);
        }
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

  const getAssetDevices = () => {
    const tempDevices = [];
    axios
      .get(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/assets/${id}/devices`)
      .then((response) => {
        if (response != null) {
          response.data.forEach((element) => {
            const temp = {
              id: element.id,
              name: element.name,
              sn: element.sn,
              types: element.types,
            };
            tempDevices.push(temp);
          });
          setIsChange(false);
          setDevices(tempDevices);
        }
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
    const types = [];
    const data = [
      { value: "temperature", text: "Temperature" },
      { value: "humidity", text: "Humidity" },
    ];
    data.map((item) => types.push(item));
    setDeviceTypes(types);
    getAssetName();
    getAssetDevices();
    getTelemetries();
    getAlerts();
  }, []);

  useEffect(() => {
    if (isChange) getAlerts();
  }, [isChange]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (selectedTab === "2") getAlerts();
    else if (selectedTab === "3") getTelemetries();
  }, [selectedTab]);

  const handleClearAlert = async (id, status) => {
    axios
      .put(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/alerts/` + id, {
        status: !status,
      })
      .then((response) => {
        setSnackbarColor("#4caf50");
        setIsChange(true);
        setSnackbarOpen(true);
        setSnackbarMessage(response.data);
      })
      .catch((error) => {
        setSnackbarColor("#ff5722");
        setSnackbarOpen(true);
        setIsChange(false);
        setSnackbarMessage("The alert status could not changed successfully");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/alerts/` + id)
      .then(function (response) {
        setIsChange(true);
        setSnackbarOpen(true);
        setSnackbarMessage(response.data);
        setSnackbarColor("#4caf50");
      })
      .catch(function (error) {
        setSnackbarColor("#ff5722");
        setSnackbarOpen(true);
        setIsChange(false);
        setSnackbarMessage("The alert could not deleted successfully");
      });
  };

  const alertsColumn = [
    {
      name: "Created At",
      options: {
        customBodyRender: (val) => {
          return <Moment format="Do MMMM YYYY, h:mm:ss a">{val}</Moment>;
        },
      },
    },
    { name: "Device Name" },
    { name: "Message" },
    { name: "Telemetry Key" },
    {
      name: "Status",
      options: {
        customBodyRender: (val) => {
          return (
            <Badge
              badgeContent={val === false ? "active" : "cleared"}
              color={val === false ? "info" : "secondary"}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 12,
                  height: 30,
                  width: 55,
                  padding: 1,
                  textTransform: "capitalize",
                  marginRight: 3,
                },
              }}
            />
          );
        },
        setCellProps: (value) => ({
          style: {
            textAlign: "center",
          },
        }),
      },
    },
    {
      name: "Severity",
      options: {
        customBodyRender: (val) => {
          return (
            <Badge
              badgeContent={val}
              color={val === "warning" ? "warning" : "error"}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 12,
                  height: 30,
                  width: 55,
                  padding: 1,
                  textTransform: "capitalize",
                  marginRight: 3,
                },
              }}
            />
          );
        },
        setCellProps: (value) => ({
          style: {
            textAlign: "center",
          },
        }),
      },
    },
    {
      name: "Action",
      options: {
        customBodyRenderLite: (rowIndex) => {
          return (
            <Box display={"flex"} flexDirection={"row"}>
              <Tooltip title="Clear">
                <IconButton
                  color="info"
                  onClick={() => {
                    const rowValue = latestAlerts[rowIndex];
                    handleClearAlert(rowValue[5], rowValue[3]);
                  }}
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={() => {
                    const rowValue = latestAlerts[rowIndex];
                    handleDelete(rowValue[5]);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    },
  ];
  const telemetryColumn = [
    {
      name: "Created At",
      options: {
        customBodyRender: (val) => {
          return <Moment format="Do MMMM YYYY, h:mm:ss a">{val}</Moment>;
        },
      },
    },
    { name: "Device Name" },
    {
      name: "Values",
      options: {
        setCellProps: (value) => ({ style: { textAlign: "left" } }),
        setCellHeaderProps: () => ({ justifyContent: "center" }),
        customBodyRender: (val) => {
          return <Typography>{val}</Typography>;
        },
      },
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
        noMatch: "Sorry, no matching records found",
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
    <>
      <Snackbar
        anchorOrigin={{
          vertical: " bottom",
          horizontal: "right",
        }}
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
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={snackbarClose}
              >
                x
              </IconButton>
            </Tooltip>,
          ]}
        />
      </Snackbar>
      <Grid item xs={12} md={6} lg={6} sx={{ marginBottom: 2 }}>
        <Button
          href="/assets"
          variant="contained"
          startIcon={<BackspaceIcon />}
          style={{ color: "#FFF" }}
        >
          Back to Assets
        </Button>
      </Grid>

      <TabContext value={selectedTab}>
        <TabList onChange={handleChange}>
          <Tab label="Dashboard" value="1"></Tab>
          <Tab label="Alerts" value="2"></Tab>
          <Tab label="Telemetry" value="3"></Tab>
        </TabList>

        <TabPanel value="1">
          <Paper sx={{ p: 3, mb: 2 }} elevation={3}>
            <Grid container spacing={2} xs={12} width={1}>
              <Grid item xs={12} md={6} lg={3}>
                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                  <Box
                    p={2}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <SensorsSharpIcon
                      sx={{ fontSize: "4rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                      mx={2}
                    >
                      <Typography variant="modal" sx={{ fontSize: "18px" }}>
                        Asset Name
                      </Typography>
                      {asset.map((element) => {
                        return (
                          <Typography
                            mx={2}
                            mt={1}
                            variant="side"
                            sx={{ color: "primary.main", fontSize: "18px" }}
                          >
                            {" "}
                            {element.name}
                          </Typography>
                        );
                      })}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                  <Box
                    p={3}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <SensorsSharpIcon
                      sx={{ fontSize: "4rem", color: "primary.main" }}
                    />
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <Box sx={{ marginLeft: 2 }}>
                        <FormControl variant="standard">
                          <InputLabel>Sensor Type</InputLabel>
                          <Select
                            labelId="select-Type"
                            id="select-TotalType"
                            value={deviceType}
                            onChange={handleDeviceTypeChange}
                            autoWidth
                            label="Select Device Type"
                          >
                            {deviceTypes.map((option) => (
                              <MenuItem key={option.id} value={option.value}>
                                {option.text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                  <Box
                    p={2}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <PriorityHighTwoToneIcon
                      sx={{
                        fontSize: "3rem",
                        color: "primary.main",
                        marginTop: 4,
                      }}
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
                        <Typography variant="modal" sx={{ fontSize: "15px" }}>
                          Daily MAX:
                        </Typography>
                        <Typography
                          mx={1}
                          variant="side"
                          sx={{ color: "primary.main", fontSize: "15px" }}
                        >
                          {dailyMax == null ? 0 : dailyMax}
                        </Typography>
                      </Grid>
                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        mb={1}
                      >
                        <Typography variant="modal" sx={{ fontSize: "15px" }}>
                          Weekly MAX:
                        </Typography>
                        <Typography
                          mx={1}
                          variant="side"
                          sx={{ color: "primary.main", fontSize: "15px" }}
                        >
                          {weeklyMax == null ? 0 : weeklyMax}
                        </Typography>
                      </Grid>
                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        mb={1}
                      >
                        <Typography variant="modal" sx={{ fontSize: "15px" }}>
                          Monthly MAX:
                        </Typography>
                        <Typography
                          mx={1}
                          variant="side"
                          sx={{ color: "primary.main", fontSize: "15px" }}
                        >
                          {monthlyMax == null ? 0 : monthlyMax}
                        </Typography>
                      </Grid>
                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        sx={{ marginBottom: "5px" }}
                      >
                        <Typography variant="modal" sx={{ fontSize: "15px" }}>
                          Yearly MAX:
                        </Typography>
                        <Typography
                          mx={1}
                          variant="side"
                          sx={{ color: "primary.main", fontSize: "15px" }}
                        >
                          {yearlyMax == null ? 0 : yearlyMax}
                        </Typography>
                      </Grid>
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
                    justifyContent={"space-between"}
                  >
                    <BalanceIcon
                      sx={{
                        fontSize: "3rem",
                        color: "primary.main",
                        marginTop: 5,
                      }}
                    />
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-around"}
                      p={1}
                    >
                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        mb={1}
                        mt={1}
                      >
                        <Typography variant="modal" sx={{ fontSize: "15px" }}>
                          Daily AVG:
                        </Typography>
                        <Typography
                          mx={1}
                          variant="side"
                          sx={{ color: "primary.main", fontSize: "15px" }}
                        >
                          {dailyAvg == null ? 0 : Number(dailyAvg).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        mb={1}
                      >
                        <Typography variant="modal" sx={{ fontSize: "15px" }}>
                          Weekly AVG:
                        </Typography>
                        <Typography
                          mx={1}
                          variant="side"
                          sx={{ color: "primary.main", fontSize: "15px" }}
                        >
                          {weeklyAvg == null ? 0 : Number(weeklyAvg).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        mb={1}
                      >
                        <Typography variant="modal" sx={{ fontSize: "15px" }}>
                          Monthly AVG:
                        </Typography>
                        <Typography
                          mx={1}
                          variant="side"
                          sx={{ color: "primary.main", fontSize: "15px" }}
                        >
                          {monthlyAvg == null
                            ? 0
                            : Number(monthlyAvg).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        sx={{ marginBottom: "5px" }}
                      >
                        <Typography variant="modal" sx={{ fontSize: "15px" }}>
                          Yearly AVG:
                        </Typography>
                        <Typography
                          mx={1}
                          variant="side"
                          sx={{ color: "primary.main", fontSize: "15px" }}
                        >
                          {yearlyAvg == null ? 0 : Number(yearlyAvg).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ p: 3 }} elevation={3}>
            {asset.map((element) => {
              return (
                <Typography
                  variant="modal"
                  sx={{
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                >
                  {element.name} devices
                </Typography>
              );
            })}
            <Grid container spacing={3}>
              {devices.map((element) => {
                return (
                  <DeviceCard
                    name={element.name}
                    status={"asset"}
                    id={element.id}
                  />
                );
              })}
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value="2">
          <Paper sx={{ p: 5 }} elevation={3}>
            <Grid
              container
              spacing={2}
              xs={12}
              width={1}
              sx={{ marginBottom: 3 }}
            >
              <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={3}>
                  <Box
                    p={1}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <NotificationsIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Active Alerts</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {activeAlertCount}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <Paper elevation={3}>
                  <Box
                    p={1}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <DataUsageIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Daily</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {dailyAlert}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <Paper elevation={3}>
                  <Box
                    p={1}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <DataUsageIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Weekly</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {weeklyAlert}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                  <Box
                    p={1}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <DataUsageIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Monthly</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {monthlyAlert}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <Paper sx={{ bgcolor: "white" }} elevation={3}>
                  <Box
                    p={1}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <DataUsageIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Yearly</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {yearlyAlert}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Box>
              <FormControl
                variant="standard"
                sx={{ marginTop: 2, width: "25%", marginBottom: 2 }}
              >
                <InputLabel>Total Alerts</InputLabel>
                <Select
                  labelId="select-demo"
                  id="select-totalAlert"
                  value={alertValue}
                  onChange={handleAlertChange}
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
            <Grid item xs={12}>
              <MUIDataTable
                title={"Latest Alerts"}
                data={latestAlerts}
                columns={alertsColumn}
                options={options}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ justifyContent: "right", display: "flex", marginTop: 2 }}
            >
              <Box>
                <Tooltip title="Clear All">
                  <Button
                    variant="contained"
                    onClick={handleOpenClearAll}
                    color="info"
                    startIcon={<ClearAllIcon />}
                    style={{ color: "#FFF", textTransform: "capitalize" }}
                  >
                    Clear All
                  </Button>
                </Tooltip>
              </Box>

              <Box sx={{ marginLeft: 2 }}>
                <Tooltip title="Delete All">
                  <Button
                    variant="contained"
                    onClick={handleOpenDeleteAll}
                    sx={{ backgroundColor: "#f44336" }}
                    startIcon={<CloseIcon />}
                    style={{ color: "#FFF", textTransform: "capitalize" }}
                  >
                    Delete All
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
          </Paper>
          <ClearAllDeviceAlert
            open={openClearAllDialog}
            isAsset={true}
            handleclose={handleCloseClearAll}
            fullWidth={true}
            maxWidth="md"
            setIsChange={setIsChange}
            id={id}
          />
          <DeleteAllDeviceAlert
            open={openDeleteAllDialog}
            isAsset={true}
            handleclose={handleCloseDeleteAll}
            fullWidth={true}
            maxWidth="md"
            setIsChange={setIsChange}
            id={id}
          />
        </TabPanel>
        <TabPanel value="3">
          <Paper sx={{ p: 5 }} elevation={3}>
            <Grid
              container
              spacing={2}
              xs={12}
              width={1}
              sx={{ arginBottom: 3 }}
            >
              <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3}>
                  <Box
                    p={1}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <DataUsageIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Daily</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {dailyTelemetry}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3}>
                  <Box
                    p={1}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <DataUsageIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Weekly</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {weeklyTelemetry}
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
                    <DataUsageIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Monthly</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {monthlyTelemetry}
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
                    <DataUsageIcon
                      sx={{ fontSize: "5rem", color: "primary.main" }}
                    />
                    <Box
                      flexDirection={"column"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="modal">Yearly</Typography>
                      <Typography
                        mx={1}
                        variant="side"
                        sx={{ color: "primary.main" }}
                      >
                        {yearlyTelemetry}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <MUIDataTable
                  title={"Latest Telemetries"}
                  data={latestTelemetry}
                  columns={telemetryColumn}
                  options={options}
                />
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
      </TabContext>
    </>
  );
}

export default AssetsDevices;
