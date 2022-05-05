import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const EpochsStep = props => {

  return (
    <form 
    
    noValidate autoComplete="off">
      <div>
        <TextField
          id="selectEpochs"
          type="number"
          min={1}
          step={1}
          max={20}
          label="Select Epochs"
          value={props.epochs}
          onChange={e => props.clicked(e.target.value)}
        />
      </div>
    </form>
  );
};

export default EpochsStep;
