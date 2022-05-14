import React from "react";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import PredictionPlot from "../plots/PredictionPlot";
import axios from "axios";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import conf from '../../../conf.json';
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const TrainContainer = (props) => {
  const [lags, setLags] = React.useState(6);
  const [epochs, setEpochs] = React.useState(5);
  const [trained, setTrained] = React.useState(false);
  const [predicted, setPredicted] = React.useState(false);
  const [trainStatus, setTrainStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // const [loading, setLoading] = React.useState(false);
  const [lossData, setLossData] = React.useState({
    count: epochs,
    text: [],
    X: [],
    y: [],
    trained: trained,
  });

  const [predictions, setPredictions] = React.useState([]);

  const resetLossData = () => {
    setLossData({
      count: 0,
      text: [],
      X: [],
      y: [],
      trained: false,
    });
    setTrained(false);
  };
  const handleLagsChanged = (event, newValue) => {
    if (typeof newValue === "number") {
      resetLossData();
      setLags(parseInt(newValue, 10));
    }
  };

  const handleEpochsChanged = (event, newValue) => {
    if (typeof newValue === "number") {
      resetLossData();
      setEpochs(parseInt(newValue, 10));
    }
  };

  const handleNextStep = () => {
    handlePredict();
    props.handleNext();
  };

  const handleTrain = (event) => {
    const tsdata = props.tsdata;

    setTrainStatus(false);

    setLoading(true);
    axios
      .post(`${conf.timeSeries.IP}:${conf.timeSeries.PORT}/api/v1/timeseries/predict`, {
        trainData: tsdata,
        epochs: epochs,
        lags: lags,
      })
      .then(function (response) {
        setLoading(false);
        setPredictions(response.data.predData);
        setTrained(true);
        setPredicted(true);
        setTrainStatus(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePredict = (event) => {
    props.setPredicted(true);
  };

  return (
    <Box sx={{ mt: 2, p: 3 }}>
      <Grid
        container
        sx={{ mt: 2, boxShadow: 5, p: 2, bgcolor: "white" }}
        spacing={2}
        xs={12}
        width={1}
      >
        <Grid item lg={6} md={6} xs={12}>
          <Typography variant="caption" id="Select-Lags" gutterBottom>
            Select Lags
          </Typography>
          <Slider
            id="selectLags"
            valueLabelDisplay="on"
            aria-labelledby="Select-Lags"
            min={1}
            max={30}
            defaultValue={lags}
            onChange={handleLagsChanged}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Typography id="Select-Epochs" variant="caption" gutterBottom>
            Select Epochs
          </Typography>
          <Slider
            id="selectEpochs"
            valueLabelDisplay="on"
            aria-labelledby="Select-Epochs"
            min={1}
            max={20}
            defaultValue={epochs}
            onChange={handleEpochsChanged}
          />
        </Grid>

        <Box sx={{ mt: 2 }}>
          {!loading ? (
            <Button
              color="primary"
              onClick={handleTrain}
              variant="contained"
              disabled={loading}
            >
              Predict
            </Button>
          ) : (
            <Button sx={{ mt: 2 }} color="primary" variant="contained">
              <CircularProgress sx={{ p: 1 }} color="third" />
            </Button>
          )}
        </Box>
      </Grid>
      {predicted && predictions.length > 0 ? (
        <Grid
          container
          sx={{ mt: 2, boxShadow: 5, p: 2, bgcolor: "white" }}
          spacing={2}
          xs={12}
          width={1}
        >
          <Grid item xs={12}>
            <Box>
              <PredictionPlot datasets={predictions} plot={"prediction"} />
            </Box>
          </Grid>
        </Grid>
      ) : null}

      <Box sx={{ mt: 2, float: "right" }}>
        <Button onClick={props.handleBack} variant="contained">
          Back
        </Button>
        <Button color="primary" onClick={props.handleReset} variant="contained">
          Reset
        </Button>
    
      </Box>
    </Box>
  );
};

export default TrainContainer;
