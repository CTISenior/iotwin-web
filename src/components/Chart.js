import { React, useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";




function Chart() {

    const tempData = [];
    setInterval(() => {
        const obj = { name: "Page A", heat: 10.2, humadity: 20.4, data: 0 }
        tempData.push(obj);
        console.log(tempData);
    }, 2000);

    const [data, setData] = useState([
        { name: "Test 1", heat: 0 },
        { name: "Test 2", heat: 0 },
    ]);
    useEffect(() => {
        setData((old) => [...old, tempData]);
        console.log(data);
    }, tempData)

    return (

        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}

                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="heat"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"

                    />
                    {/* <Area
                        type="monotone"
                        dataKey="humadity"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                    /> */}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart