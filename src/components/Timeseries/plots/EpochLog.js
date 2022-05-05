import React, { useRef, useEffect } from "react";
import Container from "@mui/material/Container";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";


const EpochLog = props => {
  const EpochData = props.data;

  console.log(EpochData.trained)

  const Logs = ({ logs }) => {
    const logsEndRef = useRef(null);
    const scrollToBottom = () => {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [logs]);
  
    return (
      <div className="logsWrapper">
        {logs.map((item, index) => (
          <ListItem key={index}>
              <ListItemText primary={`${item}`} />
          </ListItem>
         ))}
        <div ref={logsEndRef} />
      </div>
    );

  };

  
  return (
      <List>
        <Logs logs={EpochData.text} />
      </List>
  );

};

export default EpochLog;
