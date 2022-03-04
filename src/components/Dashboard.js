import React from 'react'
import LineChart from "./LineChart";
import io from 'socket.io-client';
const socket = io("http://176.235.202.77:8090/", { transports: ['websocket', 'polling', 'flashsocket'] })

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

const Dashboard = () => {
    return (

        <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 px-4 border-bottom">
                <div className="d-flex align-items-center">
                    <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                    <h2 className="fs-2 m-0">Dashboard</h2>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <div className='d-lg-none'>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                                className="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-fire-alt me-2"></i>Devices</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-building me-2"></i>Buildings</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                className="fas fa-cogs me-2"></i>Settings</a>
                            <a href="#" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                                className="fas fa-power-off me-2"></i>Logout</a></div>
                    </ul>
                </div>
            </nav>

            <div className="container-fluid px-4">
                <div className="row g-3 my-2">
                    <div id='info-card' className="col-xl-3 col-lg-6">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">Device ID</h3>
                                <p className="fs-5">1</p>
                            </div>
                            <i className="fas fa-fire-alt fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">Building</h3>
                                <p className="fs-5">CTIS</p>
                            </div>
                            <i
                                className="fas fa-building fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">Average</h3>
                                <p id='avg' className="fs-5">0</p>
                            </div>
                            <i className="fas fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6">
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

    )
}

export default Dashboard