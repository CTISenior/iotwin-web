import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Divider from "@mui/material/Divider";
import DataSelectionStep from "./steps/TimeSeriesStep";
import TimeSeriesData from "./data/TimeSeriesData";
import PlotContainer from "./containers/PlotContainer";
import TrainContainer from "./containers/TrainContainer";
import PredictContainer from "./containers/PredictContainer";
import { Box, Button, Container } from "@mui/material";

function getSteps() {
  return ["TimeSeries", "Training & Prediction"];
}

export default function UnivariateStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [url, setUrl] = React.useState("");
  const [type, setType] = React.useState("");
  const [tsData, setTSData] = React.useState([]);
  const [predicted, setPredicted] = React.useState(false);
  const [predictions, setPredictions] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setUrl("");
    setType("");
    setActiveStep(0);
    setTSData([]);
    setFetched(false);
  };

  const handleURLChanged = (url) => {
    setUrl(url);
  };
  const handleTypeChanged = (type) => {
    console.log("Type is : " + JSON.stringify(type));
    setType(type);
  };

  const handleFetch = async () => {
    handleReset();

    const tsdata = new TimeSeriesData();
    await tsdata.loadData(url, type).then((res) => {
      setUrl(url);
      setType(type);
    });

    let tsData = new TimeSeriesData();
    await tsData.prepareData().then((data) => {
      const tsdata = [];
      tsdata.push({
        X: data.X,
        y: data.y,
        X_label: "date",
        y_label: type,
      });
      console.log(tsdata);
      setFetched(true);
      setTSData(tsdata);
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <DataSelectionStep
            fetched={fetched}
            handleNext={handleNext}
            handleBack={handleBack}
            handleURLChanged={handleURLChanged}
            handleTypeChanged={handleTypeChanged}
            type={type}
            url={url}
            handleFetch={handleFetch}
            tsData={tsData}
          />
        );
      case 1:
        return (
          <TrainContainer
            tsdata={tsData[0]}
            predicted={predicted}
            handleReset={handleReset}
            handleBack={handleBack}
            setPredicted={setPredicted}
            setPredictions={setPredictions}
          />
        );
      default:
        return "Error";
    }
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <Box>
            <Button variant="extended" size="small" onClick={handleReset}>
              Reset
            </Button>
            <Divider />
            <PlotContainer data={tsData} />
            <TrainContainer tsdata={tsData[0]} />
          </Box>
        ) : (
          <Box>{getStepContent(activeStep)}</Box>
        )}
      </Box>
    </>
  );
}
