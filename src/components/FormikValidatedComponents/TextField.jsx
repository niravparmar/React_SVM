import React from 'react';
import {TextField} from '@material-ui/core';
import {getIn} from 'formik'

export default function ({field,form,name,helperText,error,onChange,onBlur,...otherProps})
{
    const changeHandler = (event) =>
    {
        form.setFieldValue(field.name,event.target.value);
        if(onChange)
        {
            onChange(event);
        }
    }
    const blurHandler = (event) =>
    {
        form.setFieldTouched(field.name);
        if(onBlur)
        {
            onBlur(event);
        }
    }
    const touch = getIn(form.touched, field.name);
    const errorText = getIn(form.errors, field.name);


    return(
        <TextField name={field.name} value={field.value} onChange = {changeHandler} onBlur={blurHandler} {...otherProps}
                        error =  {(touch && errorText? true:false)}
                        helperText = {(touch && errorText)|| helperText}/>

    )
    
}