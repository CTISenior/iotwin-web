import React, { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const TimeSeriesPlot = props => {
  const datasets = props.datasets;
  let chart = useRef(null);

  useEffect(() => {
    Plotly.Plots.resize("plotlyChart");
  }, []);

  return (
    <Container>
      <Plot
        divId="plotlyChart"
        data={[
          {
            x: datasets[0]["X"],
            y: datasets[0]["y"],
            type: 'scatter',
            mode: 'lines',
          },
        ]}
        layout={
          {
            autosize: true,
            title: 'TimeSeries Plot',
            yaxis: {
              title: datasets[0]["y_label"],
            },
            xaxis: {
              title: datasets[0]["X_label"],
            },
          }

        }
        style={{ width: '100%' }}
        config={{ responsive: true }}
        useResizeHandler
      />
    </Container>
  );
};

export default TimeSeriesPlot;
