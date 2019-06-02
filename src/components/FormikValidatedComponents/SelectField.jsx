import React from 'react';
import Select from 'mui-select-with-search-vivek';
import {FormHelperText} from '@material-ui/core'
import {getIn} from 'formik'


export default function ({field,form,onChange,onBlur,value,helperText,...otherProps})
{
    const changeHandler = (value) =>
    {
        form.setFieldValue(field.name,value);
        if(onChange)
        {
            onChange(value);
        }
    }
    const blurHandler = (value) =>
    {
        form.setFieldTouched(field.name);
        if(onBlur)
        {
            onBlur(value);
        }
    }

    const touch = getIn(form.touched, field.name);
    const errorText = getIn(form.errors, field.name);


    return(
<>
    <Select {...otherProps}
    onChange = {changeHandler}
    onBlur = {blurHandler}
    value = {field.value}
    />
    <FormHelperText error={Boolean(touch && errorText)}>{(touch && errorText)|| helperText}</FormHelperText>
    </>
    )
}