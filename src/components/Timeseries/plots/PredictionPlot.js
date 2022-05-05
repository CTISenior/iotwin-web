import React, { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import { useId } from "react-id-generator";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const PredictionPlot = props => {
  const datasets = props.datasets;
  const [plotId] = useId();
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
            name: datasets[0]["y_label"]
          },
          {
            x: datasets[1]["X"],
            y: datasets[1]["y"],
            type: 'scatter',
            mode: 'lines',
            name: "Prediction"
          },
        ]}
        layout={
          {
            autosize: true,
            title: 'Prediction Result',
            yaxis: {
              title: datasets[0]["y_label"],
            },
            xaxis: {
              title: datasets[0]["X_label"],
            },
            showlegend: true,
            legend: {
              x: 1,
              xanchor: 'right',
              y: 1
            }
          }
        }
        style={{ "width": "100%", "height": "100%" }}
        config={{ responsive: true }}
        useResizeHandler
      />
    </Container>
  );
};

export default PredictionPlot;
