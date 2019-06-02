import React from 'react';
import IntlTelInput from 'react-intl-tel-input';
import '../../../node_modules/react-intl-tel-input/dist/main.css';
import {FormControl,FormHelperText} from '@material-ui/core';
import {getIn} from 'formik';


export default function ({ field, form, value,onPhoneNumberChange,onPhoneNumberBlur,helperText,...other }) {

    const changeHandler = function(isValid,enteredNumber,dialCodeObject)
    {
        let calculatedIsValid = isValid;
        if(enteredNumber.length === 0 )
        {
            calculatedIsValid = true
        }

        form.setFieldValue(field.name, {invalidNumber:!calculatedIsValid,number:enteredNumber,dialCodeObject:dialCodeObject}, true);
        if(onPhoneNumberChange)
        {
            onPhoneNumberChange(isValid,enteredNumber,dialCodeObject);
        }
    }

    const blurHandler = function(isValid,enteredNumber,dialCodeObject) {
        form.setFieldTouched(field.name);
        if(onPhoneNumberBlur)
        {
            onPhoneNumberBlur(isValid,enteredNumber,dialCodeObject);
        }
    }
    const touch = getIn(form.touched, field.name);
    const errorObj = getIn(form.errors, field.name);


    return (
        <>

      <IntlTelInput 
        name={field.name}
        onPhoneNumberBlur={blurHandler}
        onPhoneNumberChange={changeHandler}
        value={field.value["number"]}
        {...other}
      />
          <FormHelperText error = {Boolean(touch && errorObj)}>{(touch && errorObj && (typeof(errorObj) === 'string'? errorObj: errorObj[Object.keys(errorObj)[0]]))|| helperText}</FormHelperText>
      </>
    );
  };