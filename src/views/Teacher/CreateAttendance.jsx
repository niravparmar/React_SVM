import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, Paper, FormControl, Select, InputLabel, Typography } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import PropTypes from 'prop-types';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

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

const monthOptions = [{ value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' }, { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' }, { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' }, { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }]

var sub = '';
class ResultTable extends React.Component {
    state = {
        subjects: [],
        subjectid: null,
        selectedMonth: null,
        presentClasses: '',
        totalClasses: ''
    }
    handleMonth = value => {
        console.log(value)
        this.setState({ selectedMonth: value })
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }


    handleSubmit = async event => {

        let response = await this.props.authenticatedApiCall('post', "/api/ProviderService/studentAttendance/" + this.props.studentid, {
            monthName: this.state.selectedMonth.value,
            totalClasses: this.state.totalClasses,
            presentClasses: this.state.presentClasses
        })
        console.log("ANUJ")
        console.log(this.state)
        if (response.data.status == 1)
            alert('Student Attendance has beed updated successfully');
        else
            alert('Something went wrong');
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.cardRoot}>
                    <ValidatorForm onSubmit={this.handleSubmit}>
                        <div className={classes.questionContainer}>
                            <FormLabel className={classes.labelContainer} component="span"> Select Month </FormLabel>
                            <div className={classes.selectContainer}>
                                <SelectValidator
                                    options={monthOptions}
                                    placeholder='Select Month'
                                    onChange={this.handleMonth}
                                    value={this.state.selectedMonth}
                                    withRequiredValidator
                                    validators={['required']}
                                    fullWidth
                                    errorMessages={['Class is required']}
                                />
                            </div>
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">Total Classes </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Total Classes"
                                    onChange={this.handleChange}
                                    name="totalClasses"
                                    value={this.state.totalClasses}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                                </div>
                                <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">Present Classes </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Present Classes"
                                    onChange={this.handleChange}
                                    name="presentClasses"
                                    value={this.state.presentClasses}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                        </div>
                        <CardActions>
                            <Button type="submit" color="primary" size="small"> SAVE </Button>
                        </CardActions>

                    </ValidatorForm>

                </Card>
            </div>
        );

    }
}

ResultTable.propTypes = {
    accountId: PropTypes.string,
    parentAccountId: PropTypes.string
}

export default withStyles(styles)(AuthenticatedPage("Provider")(ResultTable));