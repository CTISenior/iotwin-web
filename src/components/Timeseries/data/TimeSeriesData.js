import { DataFrame } from "danfojs";
import axios from 'axios';
import conf from '../../../conf.json';

export class Configuration {
  constructor() {
    this.n_lags = null;
    this.n_epochs = null;
    this._timeID = null;
    this._depVar = null;
    this._indVars = [];
  }

  get lags() {
    return this.n_lags;
  }

  get epochs() {
    return this.n_epochs;
  }

  set lags(lags) {
    this.n_lags = lags;
  }

  set epochs(epochs) {
    this.n_epochs = epochs;
  }

}

export class Data {
  constructor() {
    this._config = new Configuration();
  }

  get config() {
    return this._config;
  }

  set config(config) {
    this._config = config;
  }
}

let _tsData_instance = null;

export default class TimeSeriesData {
  constructor() {
    if (!_tsData_instance) {
      _tsData_instance = this;
    }

    this.df = null;
    this.data = null;
    this.x = null;
    this.y = null;
    return _tsData_instance;
  }

  async loadData(deviceID, deviceType) {
    if (deviceID != "" && deviceType != "") {

      const response = await axios.get(`${conf.backend.IP}:${conf.backend.PORT}/api/v1/devices/${deviceID}/telemetry/timeseries?sensorType=${deviceType}`);
      const parsedData = JSON.parse(JSON.stringify(response.data.timeSeriesData));

      const df = new DataFrame(parsedData)

      this.data = df;
    }

  }

  getColumns() {
    return this.data.columns;
  }

  prepareData(type = "temperature") {
    let self = this;
    return new Promise(resolve => {
      if (self.data == null || self.data == []) {
      } else {
        self.x = self.data['date'].values
          .map(item => new Date(Date.parse(item)));
        self.y = self.data['value'].values
          .map(item => parseFloat(item));
      }
      resolve({ X: self.x, y: self.y });
    });
  }


  getDataFrame() {
    return this.data;
  }

  getData_X() {
    return this.x;
  }

  getData_Y() {
    return this.y;
  }
}
