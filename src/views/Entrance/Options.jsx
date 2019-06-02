
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm,  RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import { Card, CardContent,FormControlLabel, Radio } from '@material-ui/core';
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
class Options extends React.Component {
    state = {
        rigthAnswer: null,
        con: 0
    }
    handleChange = (event) => {
        this.props.handleAnswer(event.target.value)
        this.setState({con: this.state.con+1})
    }
    render() {
        const { classes } = this.props;
        return (
            <div><br></br>
                <Card className={classes.cardRoot}>
                <ValidatorForm>
                        <CardContent>
                        <div className={classes.questionContainer}>
                        {this.props.question}
                        </div>
                            <div className={classes.questionContainer}>
                                <RadioGroupValidator
                                    name="answer"
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Answer is required']}
                                    value={this.state.answer} onChange={this.handleChange} row>
                                    <FormControlLabel
                                        value= "1"
                                        control={
                                            <Radio
                                                color="primary"
                                            />
                                        }
                                        label={this.props.optiona}
                                    /><br></br>
                                    <FormControlLabel
                                        value="2"
                                        control={
                                            <Radio
                                                color="primary"
                                            />
                                        }
                                        label={this.props.optionb}
                                    /><br></br>
                                    <FormControlLabel
                                        value="3"
                                        control={
                                            <Radio
                                                color="primary"
                                            />
                                        }
                                        label={this.props.optionc}
                                    /><br></br>
                                    <FormControlLabel
                                        value="4"
                                        control={
                                            <Radio
                                                color="primary"
                                            />
                                        }
                                        label={this.props.optiond}
                                    /><br></br>
                                    <FormControlLabel
                                        value="5"
                                        control={
                                            <Radio
                                                color="primary"
                                            />
                                        }
                                        label={this.props.optione}
                                    />
                                </RadioGroupValidator>
                            </div>
                        </CardContent>
                        </ValidatorForm>
                </Card>
            </div>
        );

    }

}
export default withStyles(styles)(AuthenticatedPage([2])(Options));