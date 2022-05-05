import { DataFrame } from "danfojs";
import axios from 'axios';


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

  get timeID() {
    return this._timeID;
  }

  get depVar() {
    return this._depVar;
  }

  get indVars() {
    return this._indVars;
  }

  set lags(lags) {
    this.n_lags = lags;
  }

  set epochs(epochs) {
    this.n_epochs = epochs;
  }

  set timeID(timeID) {
    this._timeID = timeID;
  }

  set depVar(depVar) {
    this._depVar = depVar;
  }

  set indVars(indVars) {
    this._indVars = indVars;
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
      console.log("Device type is : " + deviceType);
      const response = await axios.get(`http://176.235.202.77:4000/api/v1/devices/${deviceID}/telemetry2?type=${deviceType}&limit=2000`);
      const parsedData = JSON.parse(JSON.stringify(response.data));

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
        console.log("This is null");
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
