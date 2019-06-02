import React from 'react';
import {RadioGroup,FormHelperText} from '@material-ui/core';
import {getIn} from 'formik'


export default function ({field,form,name,onChange,onBlur,helperText,error,children,...otherProps})
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
        <>
        <RadioGroup name={field.name} value={field.value} onChange = {changeHandler} onBlur={blurHandler} {...otherProps}>
                        {children}
                        </RadioGroup>
                        <FormHelperText error = {Boolean(touch && errorText)}>{(touch && errorText)|| helperText}</FormHelperText>
                        </>

    )
    
}