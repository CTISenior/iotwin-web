import React, { useState } from 'react';
import MaterialTable from 'material-table';
import AddIcon from '@mui/icons-material/Add';
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Navbar from './Navbar';
import axios from 'axios';
import Alert from './Alert';

axios.get('http://176.235.202.77:4000/api/v1/devices')
  .then((response) => {
    // Success 🎉
    console.log(response);
    response.data.forEach(element => {
      const temp = {
        id: element.id,
        name: element.name,
        sn: element.sn,
        protocol: element.protocol,
        type: element.type,
        building_id: element.building_id,
        description: element.description ? element.description : '-',
        created_at: element.created_at,
        status: element.status
      };
      deviceList.push(temp);
    });
  })
  .catch((error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

function Header(props) {
  return (
    <div id="page-content-wrapper padding-bottom-2">
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 px-4 border-bottom">
        <div className="d-flex align-items-center">
          <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
          <h2 className="fs-2 m-0">Devices</h2>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar />
      </nav>
    </div>
  );
}
const currentDate = new Date().toLocaleString();
const deviceList = [
  { id: "99", name: 'Device 1', sn: '1235679', protocol: 'mqtt', type: 'T', building_id: '1', description: '-', created_at: currentDate, status: "true" },
];
export default function Devices() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#305680',
      },
      secondary: {
        main: '#305680',
      },
    },
  });
  const [tableData, setTableData] = useState(deviceList);
  const columns = [
    {
      title: "Name", field: "name", defaultSort: 'asc', validate: rowData => {
        if (rowData.name === undefined || rowData.name === "") {
          return "Name is required.";
        } else if (rowData.name.length < 3) {
          return "Name should contain at least 3 character.";
        }
        return true;
      }
    },
    {
      title: "Serial No", field: "sn", validate: rowData => {
        if (rowData.sn === undefined || rowData.sn === "") {
          return "Serial Number is required.";
        } else if (rowData.sn.length < 3) {
          return "Serial Number contain at least 3 character.";
        }
        return true;
      }
    },
    {
      title: "Protocol", field: "protocol", lookup: { "mqtt": "MQTT", "http": 'HTTP' }, validate: rowData => {
        if (rowData.protocol === undefined || rowData.protocol === "") {
          return "Please select your protocol.";
        }
        return true;
      }
    },
    {
      title: "Type", field: "type", lookup: { therm: "Temperature", hum: 'Humidity', TH: 'Temperature & Humidity' }, validate: rowData => {
        if (rowData.type === undefined || rowData.type === "") {
          return "Please select your device type.";
        }
        return true;
      }
    },
    {
      title: "Building", field: "building_id", lookup: { "1": "Building A", "2": "Building B", "3": "Building C", "4": "Building D", "5": "Building E", "6": "Building F", "7": "Building G", "8": "Building H" }, validate: rowData => {
        if (rowData.building_id === undefined || rowData.building_id === "") {
          return "Please select your building.";
        }
        return true;
      }
    },
    { title: "Description", field: "description", validate: rowData => ({ isValid: true, helperText: "Optional" }) },
    { title: "Created Time", field: "created_at", type: 'date', editable: false },
    { title: "Status", field: "status", lookup: { "true": "Running", "false": "Stopped" }, validate: rowData => ({ isValid: true, helperText: "Optional" }) },
  ];
  const [selectedRow, setSelectedRow] = useState(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto' }}>
      <Header />
      <MuiThemeProvider theme={theme}>
        <MaterialTable columns={columns} data={tableData}
          editable={{
            onRowAdd: (newRow) => new Promise((resolve, reject) => {
              newRow.created_at = currentDate;
              axios.post('http://176.235.202.77:4000/api/v1/devices', {
                "sn": newRow.sn,
                "name": newRow.name,
                "protocol": newRow.protocol,
                "type": newRow.type,
                "keys": ["temp"]
              }
              )
                .then((response) => {
                  console.log(response);
                }, (error) => {
                  console.log(error);
                });
              setTableData([...tableData, newRow])
              setTimeout(() => resolve(), 500)
            }),
            onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {

              axios.post('http://176.235.202.77:4000/api/v1/devices/' + oldRow.id, {
                "name": newRow.name,
                "protocol": newRow.protocol,
                "type": newRow.type,
                "keys": ["temp"]
              }
              )
                .then((response) => {
                  const index = oldRow.tableData.id
                  const updatedData = [...tableData]
                  updatedData[index] = newRow
                  setTableData(updatedData)
                  console.log(response);
                }, (error) => {
                  console.log(error);
                });

              setTimeout(() => resolve(), 500)
            }),
            onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const updatedData = [...tableData]
              axios.delete('http://176.235.202.77:4000/api/v1/devices/' + selectedRow.id + "/" + selectedRow.sn
              )
                .then((response) => {
                  console.log(response);
                }, (error) => {
                  console.log(error);
                });
              updatedData.splice(selectedRow.tableData.id, 1)
              setTableData(updatedData)
              setTimeout(() => resolve(), 1000)

            })
          }}
          onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
          options={{
            sorting: true, search: true, searchFieldAlignment: 'left',
            searchAutoFocus: true, searchFieldVariant: 'standard',
            addRowPosition: 'first', paging: true, pageSizeOptions: [5, 10, 20, 50, 100], paginationType: 'stepped', exportButton: true, exportAllData: true,
            exportFileName: 'Devices Information', actionsColumnIndex: -1, selection: true, selectionProps: {
            },
            rowStyle: rowData => ({
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
            }), columnsButton: true, emptyRowsWhenPaging: false
          }}
          title=""
          icons={{ Add: () => <AddIcon /> }} />
      </MuiThemeProvider>
    </div>
  )
}