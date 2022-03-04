import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxItem(props){
    const {label,checked,onChange}=props;
    return (
        <FormGroup>
            <FormControlLabel
            label={label}
            control={
                <Checkbox
                checked={checked}
                onChange={onChange}
          />}/>
        </FormGroup>
    );
}