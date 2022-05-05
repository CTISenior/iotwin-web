import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";


const TimeIDStep = props => {

  return (
    <form
      noValidate autoComplete="off">
      <div>
        <TextField
          id="selectedDevice"
          select
          label="Select the Device"
          value={props.timeID}
          onChange={e => props.clicked(e.target.value)}
        >
        </TextField>
      </div>
    </form>
  );
};

export default TimeIDStep;
