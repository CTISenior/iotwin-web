import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';

const Assets = (props) => {

    const tenantID=props.tenantID
    const assets = [];
    const [tableData,setTableData] = useState([]);

    useEffect(()=>{
        axios.get(`http://176.235.202.77:4000/api/v1/tenants/${tenantID}/assets`)
        .then((response) => {
            // Success 🎉
            let temp = [];
            response.data.forEach(elm => {
                //const data = { id: element.id, asset_id: element.asset_id, sn: element.sn, name: element.name, protocol: element.protocol, types: element.types, max_values: element.max_values, description: element.description };
                const data = [elm.id, elm.name, elm.city, elm.location, elm.coordinates, elm.description, elm.tenant_id];
                temp.push(data);
            });
            setTableData(temp);
            //Assets = response.data
            console.log(assets);
            console.log(tableData);
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
    },[])
    
    const options = {
        filterType: 'checkbox',
      };

    const columns = [
        {name:'ID', options: {display: false, viewColumns: false, filter: false}},
        {name:'Name'},
        {name:'City'},
        {name:'Location'},
        {name:'Coordinates'},
        {name:'Description'},
        {name:'Tenant'}
    ]

    return (
        <MUIDataTable
        title={"Asset List"}
        data={tableData}
        columns={columns}
        options={options}
      />
    )
}

export default Assets