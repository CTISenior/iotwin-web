import React from 'react';
import LineChart from "./LineChart";
import io from 'socket.io-client';
const socket = io("http://176.235.202.77:8090/", { transports: ['websocket', 'polling', 'flashsocket'] });

const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
const heat = [];
const hum = [];
const flag = 0;

socket.on("getDeviceInfo", function (msg) {
    let info = JSON.parse(msg);
    const date = new Date();

    if (parseInt(info.values.temperature) == 0) {
        hum.push(parseInt(info.values.humidity));
        document.getElementById('avg').textContent = average(hum).toFixed(2);
        document.getElementById('max').textContent = Math.max(...hum);
    } else if (parseInt(info.values.humidity) == 0) {
        heat.push(parseInt(info.values.temperature));
        document.getElementById('avg').textContent = average(heat).toFixed(2);
        document.getElementById('max').textContent = Math.max(...heat);
    }
});

const DeviceDetails = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row g-3 my-2">
                    <div className="col-xl-6 col-lg-6">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">Device ID</h3>
                                <p className="fs-5">1</p>
                            </div>
                            <i className="fas fa-fire-alt fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">Building</h3>
                                <p className="fs-5">CTIS</p>
                            </div>
                            <i className="fas fa-building fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">Average</h3>
                                <p id='avg' className="fs-5">0</p>
                            </div>
                            <i className="fas fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">Max Heat</h3>
                                <p id='max' className="fs-5">0</p>
                            </div>
                            <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-5">
                <h3 className="fs-4 mb-3 text-center">Device Graph</h3>
                <div id='chart' className="col-lg-9 mx-auto">
                    <LineChart />
                    <div className='text-center d-flex'>
                        <div className='col-8 col-xs-8 heat'>Heat</div>
                        <div className='col-1 col-xs-1 humidity'>Humidity</div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DeviceDetails;