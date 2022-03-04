import React,{useState, useEffect} from "react";
import {Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale} from 'chart.js'
import {Line} from 'react-chartjs-2'
import io from 'socket.io-client';
const socket = io("http://176.235.202.77:8090/",{transports: ['websocket', 'polling', 'flashsocket']})

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
)


const temp = [];
const hum = [];
const tempLabel = [];

socket.on("getDeviceInfo", function (msg) {
  let info = JSON.parse(msg);
  const date = new Date();

  if (tempLabel.length > 15) {
    tempLabel.shift();
    temp.shift();
    hum.shift();
  }
  temp.push(parseInt(info.values.temperature));
  hum.push(parseInt(info.values.humidity));
  tempLabel.push(date.getHours() + ":" + date.getMinutes());
});

const LineChart = () => {

  const [chart, setChart] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        borderColor: "#FF0000",
        fill: true,
      },
      {
        label: "Humidity",
        data:[] ,
        borderColor: "#3e95cd",
        fill: true,
      },
    ],
  })
  useEffect(()=>{
      // setTimeout(() => {
        setChart({
          labels: tempLabel,
          datasets: [
            
            {
              label: "Temperature",
              data: temp,
              borderColor: "#FF0000",
              fill: true,
            },
            {
              label: "Humidity",
              data: hum,
              borderColor: "#3e95cd",
              fill: true,
            },
          ],
        },[tempLabel,temp,hum]);
      // }, 500)
  },[hum, temp])
  var options = {
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
      labels:{
        fontSize: 26
      }
    }
  }
  return (
    <div style ={{width:'100%'}}>
      <div >
      <Line 
        data ={chart}
        height={400}
        width={600}
        options={options}
      /> 
      </div>
    </div>
  )
}

export default LineChart