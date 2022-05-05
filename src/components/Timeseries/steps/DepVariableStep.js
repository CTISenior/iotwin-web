import React from "react";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const DepVarStep = props => {

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          id="selectDepVar"
          select
          label="Select Dependent Variable"
          value={props.depVar}
          onChange={e => props.clicked(e.target.value)}
        >
        </TextField>
      </div>
    </form>
  );
};

export default DepVarStep;
