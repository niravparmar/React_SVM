import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, FormControlLabel, Radio, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import SuccessDialog from '../../components/SuccessDialog';

const styles = () => ({
    questionContainer: {
        display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px"
    },
    labelContainer: {
        width: "200px", textAlign: "right", marginRight: "35px"
    },
    inputItem: {
        width: 400
    },
    selectContainer: {
        width: 200
    },
    cardRoot: {
        "overflow": "initial"
    },
    resetButton: {
        position: "absolute", right: '10%'
    },
    OkButton:{
        backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px",  width: "100px"
    }
});

const qualificationOptions = [{ value: 1, label: "B.Sc" }, { value: 2, label: "M.Sc" }, { value: 3, label: "B.Tech" }, { value: 4, label: "BA" }];
const subjectOptions = [{ value: 1, label: "Science" }, { value: 2, label: "Math" }, { value: 3, label: "English" }, { value: 4, label: "Hindi" }, { value: 4, label: "History" }];
const userRoleOption = [{ value: 3, label: "Teacher" }, { value: 4, label: "Exam Head" }];

class CreateProvider extends React.Component {
    state = {
      createteacher: false, teacherupdated: false, fname: '',  lname: '', emailid: '', cellnumber: '', userrole: '', qualification: '', subject: '',  gender: '', parmanentaddress: '', localaddress: '', password: "", cpassword: ""
    };

    //handle qualification
    handleQualification = value => {
        this.setState({ qualification: value })
    }

    //handle Subject
    handleSubject = value => {
        this.setState({ subject: value })
    }
    handleUserRole = value => {
        this.setState({ userrole: value })
    }
    //set the provider value for update
    setStateForEditProvider = (data) => {
            this.setState({
            fname: data.firstname,
            lname: data.lastname,
            emailid: data.emailid,
            cellnumber: data.cellnumber,
            gender: data.gender,
            dob: data.dob,
            parmanentaddress: data.parmanentaddress,
            localaddress: data.localaddress
         
        })
        qualificationOptions.forEach(qualificationObj => {
            if (data.qualification == qualificationObj.value) {
              this.setState({qualification : qualificationObj})
            }
          })
          subjectOptions.forEach(subjectObj => {
            if (data.subject == subjectObj.value) {
              this.setState({subject : subjectObj})
            }
          })
          userRoleOption.forEach(user => {
              console.log(user)
            if (data.userrole == user.value) {
              this.setState({userrole : user})
            }
          }) 
    }

    async  componentDidMount() {
        let accountid = this.props.currentAccountId;
        if (this.props.teacherid == undefined) {
            this.setState({ buttonText: 'Create Teacher' })
        } else {
            this.setState({ buttonText: 'Update Teacher' })
        }

        ValidatorForm.addValidationRule('isEmailUsed', async (value) => {
            if (this.state.email != value) {
                let response = await Axios.get('/api/admin/email/' + value);
                return !response.data.isEmailUsed;
            }
            return true;
        });

        if (this.props.teacherid) {
            let response = await this.props.authenticatedApiCall('get', '/api/account/' + accountid + "/providers/" + this.props.teacherid, null);
            if (response != null) {
                this.setStateForEditProvider(response.data)
            } else { }
        }
    }

    //Handle the form submit event
    handleSubmit = async event => {
        let accountid = this.props.currentAccountId;
        let dataToSend = {
            fname: this.state.fname,
            lname: this.state.lname,
            emailid: this.state.emailid,
            cellnumber: this.state.cellnumber,
            dob: this.state.dob,
            gender: this.state.gender,
            qualification: this.state.qualification.value,
            subject: this.state.subject.value,
            userrole: this.state.userrole.value,
            parmanentaddress: this.state.parmanentaddress,
            localaddress: this.state.localaddress
        }
        if (this.props.teacherid) {
            let response = await this.props.authenticatedApiCall('put', '/api/account/' + accountid + "/providers/" + this.props.teacherid, dataToSend )
            if (response.data.status === 1)
            this.setState({teacherupdated: true})
            else {
                alert('Something Went Wrong');
                event.preventDefault();
            }
        } else {
            dataToSend.password = this.state.password;
            let response = await this.props.authenticatedApiCall('post', "/api/account/" + accountid + "/providers", dataToSend )
            if (response.data.status == 1)
            this.setState({createteacher: true})
            else
                alert('Something went wrong');
            event.preventDefault();
        }
    };

    //Selected providers for Admin
    selectedProviders = (stateVar) => {
        let provider = [];
        for (var i = 0; i < stateVar.length; i++) {
            provider.push(stateVar[i].value);
        }
        this.state.providers = provider;
    }

    //Coworker read Only Permission
    providerReadOnlyPermission = (readpermission) => {
        this.state.readpermission = readpermission;
        // if (readpermission == true){
        //     this.state.readpermission = true;}
        //     else{this.state.readpermission = false}
    }


    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    onPhoneNumberChange = (isValid, enteredNumber, dialCodeObject) => {
        this.setState({
            phoneNumber: enteredNumber,
            countryCode: dialCodeObject.dialCode
        });

    }
    //send the reset password link
    onResetPasswordClick = async () => {
        let response = await Axios.post('/api/account/' + this.props.currentAccountId + '/resetpassword/' + this.props.providerId, {});
        if (response.data.status === 1)
            alert(response.data.statusDescription);
    }
    coWorkerRole = null;
    setCoWorkerRole = (coWorkerRole) => {
        this.coWorkerRole = coWorkerRole;
    }
    handleCheckBox = event => {
        if(this.state.checkedValue == true){
            this.setState({checkedValue: false, localaddress: ""})
        }else{this.setState({checkedValue: true, localaddress: this.state.parmanentaddress})}
    }

    backDashboard = () =>{
        this.setState({createteacher: false})
        this.props.history.push(`./teacherlist`)
    }
        backDashboardUpdate = () =>{
        this.setState({teacherupdated: false})
        this.props.history.push(`../teacherlist`)
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const OkButtonUpdate = [<Button className={classes.OkButton} onClick={this.backDashboardUpdate}>Ok</Button>]
        const HeaderText = "Success"
        const BodyText = "Teacher has been created successfully."
        const UpdateBodyText = "Teacher has been updated successfully"
        return (
            <div><br></br>
                <Card className={classes.cardRoot}>
                    <Typography>Teacher Registration</Typography>
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
                                <FormLabel className={classes.labelContainer} component="span">Email ID</FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Teacher Email ID"
                                    onChange={this.handleChange}
                                    name="emailid"
                                    value={this.state.emailid}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
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
                                <FormLabel className={classes.labelContainer} component="span"> Gender </FormLabel>
                                <RadioGroupValidator
                                    name="gender"
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Gender is required']}
                                    value={this.state.gender} onChange={this.handleChange} row>
                                    <FormControlLabel
                                        value="male"
                                        control={
                                            <Radio
                                                color="primary"
                                            />
                                        }
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={
                                            <Radio
                                                color="primary"
                                            />
                                        }
                                        label="Female"
                                    />

                                </RadioGroupValidator>

                            </div>
                            {!(this.props.teacherid && this.props.teacherid.length > 0) &&
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span">Password</FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Password"
                                    type = "password"
                                    onChange={this.handleChange}
                                    name="password"
                                    value={this.state.password}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['First Name is required']}
                                />
                                <FormLabel className={classes.labelContainer} component="span"> Confirm Password </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Confirm Password"
                                    type = "password"
                                    onChange={this.handleChange}
                                    name="cpassword"
                                    value={this.state.cpassword}
                                    withRequiredValidator
                                    validators={['required',`isStringEqual:${this.state.password}`]}
                                    errorMessages={['Last Name is required','Password must be equal']}
                                />
                            </div>}
                            <br /><br />
                            <hr />
                            <br />
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Qualification </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={qualificationOptions}
                                        placeholder='Select Qualification'
                                        onChange={this.handleQualification}
                                        value={this.state.qualification}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Qualification is required']}
                                    />
                                </div>
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
                                        errorMessages={['Subject is required']}
                                    />
                                </div>
                                <FormLabel className={classes.labelContainer} component="span"> User Role </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={userRoleOption}
                                        placeholder='Select User Role'
                                        onChange={this.handleUserRole}
                                        value={this.state.userrole}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Subject is required']}
                                    />
                                </div>
                            </div>

                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Parmanent Address </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Parmanent Address"
                                    onChange={this.handleChange}
                                    multiline
                                    rows={3}
                                    name="parmanentaddress"
                                    value={this.state.parmanentaddress}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FormLabel className={classes.labelContainer} component="span"> Local Address </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Local Address"
                                    onChange={this.handleChange}
                                    multiline
                                    rows={3}
                                    name="localaddress"
                                    value={this.state.localaddress}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </div>
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> My Parmanent and Local Address is Same. </FormLabel>
                                <Checkbox
                                    checked={this.state.checkedValue}
                                    onChange={this.handleCheckBox}
                                    value={this.state.checkedValue}
                                    color="primary"
                                />
                            </div>

                        </CardContent>
                        <CardActions>
                            <Button type="submit" color="primary" size="small">
                                {this.state.buttonText}
                            </Button>
                        </CardActions>
                    </ValidatorForm>
                    {(this.state.createteacher ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={BodyText} dismiss={this.backDashboard} />: "")}
                    {(this.state.teacherupdated ? <SuccessDialog successButton={OkButtonUpdate} HeaderText={HeaderText} BodyText={UpdateBodyText} dismiss={this.backDashboardUpdate} />: "")}
                </Card>
            </div>
        );

    }
}
export default withStyles(styles)(AuthenticatedPage("AccountAdmin")(WithAccount((CreateProvider))));