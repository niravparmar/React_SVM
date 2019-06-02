import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, FormControlLabel, Radio, Typography } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import PropTypes from 'prop-types';


var emailID;
const styles = () => ({
    questionContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "15px"
    },
    labelContainer: {
        width: "200px",
        textAlign: "right",
        marginRight: "35px",
        fontSize: "14px",
        fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'",
    },
    inputItem: {
        width: 400
    },
    selectContainer: {
        width: 200
    },
    cardRoot: {
        "overflow": "initial"
    }
});

const studentOptions = [{value: 2, label:"Entrance Type"}]
const classOptions = [{ value:1, label:"6th"},{value:2, label:"7th"}, {value:3, label:"8th"}, {value:4, label:"9th"}, {value:5, label:"10th"}, {value:6, label:"11th"}, {value:7, label:"12th"}];

class CreateStudent extends React.Component {
    state = {
        fname: "",
        lname: "",
        cellnumber: "",
        dob: "",
        studenttype:"",
        class: ""
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleStudentType = value => {
        this.setState({ studenttype: value })
    }
    
    handleClass = value =>{
        this.setState({class: value})
    }
    //Handle the form submit event
    handleSubmit = async event => {

            let response = await this.props.authenticatedApiCall('post', "/api/ProviderService/entranceRegistration", {
                fname: this.state.fname,
                lname: this.state.lname,
                cellnumber: this.state.cellnumber,
                dob: this.state.dob,
                studenttype: this.state.studenttype.value,
                class: this.state.class.value
            })
            if (response.data.status == 1)
                alert('Student Registered successfully');
            else
                alert('Something went wrong');
            event.preventDefault();
        
    };
    render() {
        const { classes } = this.props;
        return (
            <div><br></br>
                <Card className={classes.cardRoot}>
                    <Typography>Student Registration</Typography>
                    <ValidatorForm onSubmit={this.handleSubmit}>

                        <CardContent>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">First Name </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="First Name"
                                    onChange={this.handleChange}
                                    name="fname"
                                    value={this.state.fname}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Last Name </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Last Name"
                                    onChange={this.handleChange}
                                    name="lname"
                                    value={this.state.lname}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Last Name is required']}
                                />
                            </div>


                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Mobile Number </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Mobile Number"
                                    onChange={this.handleChange}
                                    rows={5}
                                    name="cellnumber"
                                    value={this.state.cellnumber}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Mobile Munber is required']}
                                />
                            </div>

                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Birth Date </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Birth Date"
                                    onChange={this.handleChange}
                                    rows={5}
                                    name="dob"
                                    value={this.state.dob}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Birth Date is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                            <FormLabel className={classes.labelContainer} component="span"> Student Type </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={studentOptions}
                                        placeholder='Select Student Type'
                                        onChange={this.handleStudentType}
                                        value={this.state.studenttype}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Subject is required']}
                                    />
                                </div>
                            </div>
                            <div className={classes.questionContainer}>
                            <FormLabel className={classes.labelContainer} component="span"> Class </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={classOptions}
                                        placeholder='Select Class'
                                        onChange={this.handleClass}
                                        value={this.state.class}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Subject is required']}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button type="submit" color="primary" size="small">
                               Register
                            </Button>
                        </CardActions>
                    </ValidatorForm>


                </Card>
            </div>
        );

    }
}

CreateStudent.propTypes = {
    accountId: PropTypes.string,
    parentAccountId: PropTypes.string
}

export default withStyles(styles)(AuthenticatedPage("CoWorker")(CreateStudent));