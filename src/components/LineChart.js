import React, { useState, useEffect } from "react";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'
import io from 'socket.io-client';
import Alert from './Alert';
import { Box } from "@mui/system";
import { Grid, Paper } from "@mui/material";


ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)



const LineChart = (props) => {

  const { chart } = props;

  var options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Graph',
      }
    },
    maintainAspectRactio: false,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value + " \u2103 ";
          },
        },
      },
    },
    legend: {
      labels: {
        fontSize: 26
      }
    },
  }
  return (

    <Line
      data={chart}
      height={400}
      width={600}
      options={options}
    />
  )
}

export default LineChart