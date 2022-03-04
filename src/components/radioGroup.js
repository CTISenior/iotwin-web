import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RadioItem(props){
    const {ringtone,name,value,onChange,option}=props;
    return (
        <FormControl>
        <RadioGroup
          aria-label={ringtone}
          name={name}
          value={value}
          onChange={onChange}>
         {option.map((options) => (
            <FormControlLabel
              value={options}
              key={options}
              control={<Radio />}
              label={options}
            />
          ))}
        </RadioGroup>
        </FormControl>
    );
}