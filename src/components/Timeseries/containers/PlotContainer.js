import React from "react";
import Grid from "@mui/material/Grid";
import TSPlot from "../plots/TimeSeriesPlot";
import Typography from "@mui/material/Typography";


const PlotContainer = props => {
  let size = 12;

  return (

    <Grid container spacing={3}>
      {props.data.length > 0 ? (
        <Grid item lg={12} md={12} xs={12}>
          <TSPlot datasets={props.data} />
        </Grid>
      ) : null}
    </Grid>

  );
};

export default PlotContainer;
