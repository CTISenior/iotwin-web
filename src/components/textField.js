import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function TextFieldItem(props){
    const {margin,id,label,type,variant,error,onChange,helperText,...required}=props;
    let element;
    if({...required && error}){
        element=(
            <TextField
            autoFocus
            margin={margin}
            id={id}
            label={label}
            type={type}
            fullWidth
            variant={variant}
            {...required}
            error={error}
            helperText={helperText}
            onChange={onChange}/>
        );
    }
    else{
        element=(
            <TextField
            autoFocus
            margin={margin}
            id={id}
            label={label}
            type={type}
            fullWidth
            variant={variant}
            onChange={onChange}/>
        );
    }
    return (
        <div>
            {element}
        </div>
    );
}