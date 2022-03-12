import React,{useState} from 'react';
import MaterialTable from 'material-table';
import AddIcon from '@mui/icons-material/Add';
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Navbar from './Navbar';
import axios from 'axios';

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
const currentDate=new Date().toLocaleString();
const deviceList=[
  {name:'Device 1',serialNo:'1235679',protocol:'MQTT',type:'T',building:'A',description:'-',createdTime:currentDate,status:0},
        {name:'Device 2',serialNo:'23',protocol:'MQTT',type:'H',building:'B',description:'-',createdTime:currentDate,status:0},
        {name:'Device 3',serialNo:'3',protocol:'HTTP',type:'TH',building:'C',description:'-',createdTime:currentDate,status:1},
        {name:'Device 4',serialNo:'4',protocol:'MQTT',type:'H',building:'D',description:'-',createdTime:currentDate,status:1},
        {name:'Device 5',serialNo:'5',protocol:'HTTP',type:'T',building:'E',description:'-',createdTime:currentDate,status:1},
        {name:'Device 6',serialNo:'6',protocol:'HTTP',type:'T',building:'F',description:'-',createdTime:currentDate,status:0},
        {name:'Device 7',serialNo:'7',protocol:'MQTT',type:'H',building:'G',description:'-',createdTime:currentDate,status:0},
        {name:'Device 8',serialNo:'8',protocol:'MQTT',type:'T',building:'H',description:'-',createdTime:currentDate,status:1}
];
export default function Devices(){
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
    const [tableData,setTableData]=useState(deviceList);
    const columns=[
        {title:"Name",field:"name",defaultSort:'asc',validate: rowData =>{
          if(rowData.name===undefined || rowData.name===""){
            return "Name is required.";
          }else if(rowData.name.length<3){
            return "Name should contain at least 3 character.";
          }
          return true;
        }},
        {title:"Serial No",field:"serialNo",validate: rowData =>{
        if(rowData.serialNo===undefined || rowData.serialNo===""){
          return "Serial Number is required.";
        }else if(rowData.serialNo.length<3){
          return "Serial Number contain at least 3 character.";
        }
        return true;
      }},
        {title:"Protocol",field:"protocol",lookup:{MQTT:"MQTT",HTTP:'HTTP'},validate: rowData =>{
          if(rowData.protocol===undefined || rowData.protocol===""){
            return "Please select your protocol.";
          }
          return true;
        }},
        {title:"Type",field:"type",lookup:{T:"Temperature",H:'Humidity',TH:'Temperature & Humidity'},validate: rowData =>{
          if(rowData.type===undefined || rowData.type===""){
            return "Please select your device type.";
          }
          return true;
        }},
        {title:"Building",field:"building",lookup:{A:"Building A",B:"Building B",C:"Building C",D:"Building D",E:"Building E",F:"Building F",G:"Building G",H:"Building H"},validate: rowData =>{
          if(rowData.building===undefined || rowData.building===""){
            return "Please select your building.";
          }
          return true;
        }},
        {title:"Description",field:"description",validate:rowData=>({isValid:true,helperText:"Optional"})},
        {title:"Created Time",field:"createdTime",type:'date',editable:false},
        {title:"Status",field:"status",lookup:{0:"Running",1:"Stopped"},validate:rowData=>({isValid:true,helperText:"Optional"})},
    ];
    const [selectedRow, setSelectedRow] = useState(null);
    return (
        <div style={{display:'flex',flexDirection:'column',width:'100%',height:'auto'}}>
        <Header/>
        <MuiThemeProvider theme={theme}>
          <MaterialTable columns={columns} data={tableData}
        editable={{
            onRowAdd: (newRow) => new Promise((resolve, reject) => {
                newRow.createdTime=currentDate;
                axios.post('http://localhost:9090/v1/api/device/add', {newRow})
                .then(function (response) {
                console.log(response);
                })
                .catch(function (error) {
                console.log(error);
                });
                setTableData([...tableData, newRow])
                setTimeout(() => resolve(), 500)
            }),
            onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
              const index=oldRow.tableData.id
              const updatedData = [...tableData]
              updatedData[index] = newRow
              axios.post('http://localhost:9090/v1/api/device/edit', {newRow})
              .then(function (response) {
              console.log(response);
              })
              .catch(function (error) {
              console.log(error);
              });
              setTableData(updatedData)
              setTimeout(() => resolve(), 500)
            }),
            onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const updatedData = [...tableData]
              axios.post('http://localhost:9090/v1/api/device/delete', {selectedRow})
              .then(function (response) {
              console.log(response);
              })
              .catch(function (error) {
              console.log(error);
              });
              updatedData.splice(selectedRow.tableData.id, 1)
              setTableData(updatedData)
              setTimeout(() => resolve(), 1000)
  
            })
          }}
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{sorting:true,search:true,searchFieldAlignment:'left',
        searchAutoFocus:true,searchFieldVariant:'standard',
        addRowPosition:'first',paging:true,pageSizeOptions:[5,10,20,50,100],paginationType:'stepped',exportButton:true,exportAllData:true,
        exportFileName:'Devices Information',actionsColumnIndex:-1,selection:true,selectionProps:{
        },
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        }),columnsButton:true,emptyRowsWhenPaging: false
        }}
        title=""
        icons={{Add:()=><AddIcon/>}}/>  
        </MuiThemeProvider>
        </div>
    )
}