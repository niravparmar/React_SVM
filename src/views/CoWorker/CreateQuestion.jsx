import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, FormControlLabel, Radio, Typography } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import PropTypes from 'prop-types';

const classOptions = [{ value: 1, label: "6th" }, { value: 2, label: "7th" }, { value: 3, label: "8th" }, { value: 4, label: "9th" }, { value: 5, label: "10th" }, { value: 6, label: "11th" }, { value: 7, label: "12th" }];
const subjectOptions = [{ value: 1, label: "Science" }, { value: 2, label: "Math" }, { value: 3, label: "English" }, { value: 4, label: "Hindi" }, { value: 5, label: "History" }];
const answerOptions = [{ value: 1, label: "Option A" }, { value: 2, label: "Option B" }, { value: 3, label: "Option C" }, { value: 4, label: "Option D" }, { value: 5, label: "Non of These" }];
const optioneOptions = [{ value: 5, label: "None of These" }]

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

class CreateStudent extends React.Component {
    state = {
        buttonText: "",
        question: "",
        optiona: "",
        optionb: "",
        optionc: "",
        optiond: "",
        optione: "",
        answer: "",
        class: "",
        subject: ""
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleClass = value => {
        this.setState({ class: value })
    }
    handleSubject = value => {
        this.setState({ subject: value })
    }
    handleAnswer = value => {
        this.setState({ answer: value })
    }
    handleOptionE = value => {
        this.setState({ optione: value })
    }
    //set the provider value for update
    setStateForEditProvider = (data) => {
        console.log(data[0])
        this.setState({
            question: data[0].question,
            optiona: data[0].optiona,
            optionb: data[0].optionb,
            optionc: data[0].optionc,
            optiond: data[0].optiond,
            optione:optioneOptions
        })
        answerOptions.forEach(answerObj => {
            if (data[0].answer == answerObj.value) {
              this.setState({answer : answerObj})
            }
          })
        classOptions.forEach(classObj => {
            if (data[0].class == classObj.value) {
              this.setState({class : classObj})
            }
          })
          subjectOptions.forEach(subjectObj => {
            if (data[0].subject == subjectObj.value) {
              this.setState({subject : subjectObj})
            }
          })
    }

    async componentDidMount() {
        let questionid = this.props.questionid;
        console.log(questionid)
        if (questionid == undefined) {
            this.setState({ buttonText: 'Registration' })
        } else {
            this.setState({ buttonText: 'Update Student' })
        }

        let response = await this.props.authenticatedApiCall('get', '/api/ProviderService/' + questionid + '/getquestionforedit', null);
        if (response.data.length > 0) {
            this.setStateForEditProvider(response.data)
        } else { }
    }

    //Handle the form submit event
    handleSubmit = async event => {
        let dataToSend = {
            question: this.state.question,
            optiona: this.state.optiona,
            optionb: this.state.optionb,
            optionc: this.state.optionc,
            optiond: this.state.optiond,
            optione: this.state.optione.label,
            answer: this.state.answer.value,
            class: this.state.class.value,
            subject: this.state.subject.value
        }
        console.log(dataToSend)
        if(this.props.questionid){
            let response = await this.props.authenticatedApiCall('put', "/api/ProviderService/"+this.props.questionid+"/updatequestion", dataToSend)
            if (response.data.status == 1)
                alert('Question updated successfully');
            else
                alert('Something went wrong');
            event.preventDefault();
    
        }
        else{
            let response = await this.props.authenticatedApiCall('post', "/api/ProviderService/entranceQuestion", dataToSend)
            if (response.data.status == 1)
                alert('Student Registered successfully');
            else
                alert('Something went wrong');
            event.preventDefault();
        } 
    };
    render() {
        const { classes } = this.props;
        return (
            <div><br></br>
                <Card className={classes.cardRoot}>
                    <Typography>Create Question</Typography>
                    <ValidatorForm onSubmit={this.handleSubmit}>

                        <CardContent>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">Question </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Question"
                                    onChange={this.handleChange}
                                    name="question"
                                    value={this.state.question}
                                    multiline
                                    rows={2}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Question is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Option A </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Option A"
                                    onChange={this.handleChange}
                                    name="optiona"
                                    value={this.state.optiona}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Option A is required']}
                                />
                            </div>


                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Option B </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Option B"
                                    onChange={this.handleChange}
                                    name="optionb"
                                    value={this.state.optionb}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Option B is required']}
                                />
                            </div>

                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Option C </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Option C"
                                    onChange={this.handleChange}
                                    name="optionc"
                                    value={this.state.optionc}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Option C is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Option D </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Option D"
                                    onChange={this.handleChange}
                                    name="optiond"
                                    value={this.state.optiond}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Option D is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Option E </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={optioneOptions}
                                        placeholder='Select Option E'
                                        onChange={this.handleOptionE}
                                        value={this.state.optione}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Option E is required']}
                                    />
                                </div>
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Answer </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={answerOptions}
                                        placeholder='Select Answer'
                                        onChange={this.handleAnswer}
                                        value={this.state.answer}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Answer is required']}
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
                                        errorMessages={['Class is required']}
                                    />
                                </div>
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Subject </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={subjectOptions}
                                        placeholder='Select Subject'
                                        onChange={this.handleSubject}
                                        value={this.state.subject}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['subject is required']}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button type="submit" color="primary" size="small">
                                {this.state.buttonText}
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