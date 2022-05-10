import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const LagsStep = props => {

  return (
    <form 
     noValidate autoComplete="off">
      <div>
        <TextField
          id="selectLags"
          type="number"
          min={1}
          step={1}
          max={30}
          label="Select Lags"
          value={props.lags}
          onChange={e => props.clicked(e.target.value)}
        />
      </div>
    </form>
  );
};

export default LagsStep;
