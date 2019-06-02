import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, FormControlLabel, Radio, Typography } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import PropTypes from 'prop-types';
import utilFunctions from './utilsAccountCreateAndEdit';


const healthOptions = [{ value: 1, label: "HealthPlan" }, { value: 2, label: "HealthSystem" }, { value: 3, label: "Hospital" }, { value: 4, label: "Endocronology Practice" }, { value: 5, label: "Primary Care Practice" }];
const MeterOptions = [{ value: 1, label: "Accu Chek Aviva Connect" }, { value: 2, label: "Accu Chek Guide" }, { value: 3, label: "Contour Next One" }, { value: 4, label: "One Touch Verio Flex" }];
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




class CreateAccount extends React.Component {
  state = {
    schoolname: "",
    registration: "",
    firstname: "",
    lastname: "",
    emailis: "",
    cellnumber: "",
    password: "",
    schooladdress: ""
  }

  async componentDidMount() {

  }
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit = async event => {
    if(this.props.accountId && this.props.accountId.length > 0){
      let response = await this.props.authenticatedApiCall('put', "/api/account/"+ this.props.accountId, {
        schoolname: this.state.schoolname,
        registration: this.state.registration,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        emailid: this.state.emailid,
        cellnumber: this.state.cellnumber,
        password: this.state.password,
        schooladdress: this.state.schooladdress
      });
      if (response.data.status === 1){
        alert('Account updated successfully');
      }
      else{
        alert('Something went wrong');
      event.preventDefault();
    }
    }else{
      let response = await this.props.authenticatedApiCall('post', "/api/account/createschooladmin", {
        schoolname: this.state.schoolname,
        registration: this.state.registration,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        emailid: this.state.emailid,
        cellnumber: this.state.cellnumber,
        password: this.state.password,
        schooladdress: this.state.schooladdress
      });
      if (response)
        alert('Account created successfully');
      else{
        alert('Something went wrong');
      event.preventDefault();
    }
  }
   
  }

  setStateForEditAccount = (data) =>{
      this.setState({
        schoolname : data.accountname,
        registration: data.accountrefnumber,
        firstname: data.firstname,
        lastname: data.lastname,
        emailid: data.emailid,
        cellnumber: data.cellnumber,
        schooladdress: data.accountaddress
      })
  }

 async componentDidMount() {
   if(this.props.accountId){
     let response = await this.props.authenticatedApiCall('get', '/api/account/'+this.props.accountId+'/withdetails', null);
     if(response.data !== null){
        this.setStateForEditAccount(response.data[0]);
    }
   }
 }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.cardRoot}>
          <Typography>Create Account</Typography>
          <ValidatorForm onSubmit={this.handleSubmit}>

            <CardContent>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> School Name </FormLabel>
                <TextValidator
                  className={classes.inputItem}
                  label="School Name"
                  onChange={this.handleChange}
                  name="schoolname"
                  value={this.state.schoolname}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Registration Number </FormLabel>
                <TextValidator
                  className={classes.inputItem}
                  label="Registration Number"
                  onChange={this.handleChange}
                  name="registration"
                  value={this.state.registration}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> First Name </FormLabel>
                <TextValidator
                  label="Admin First Name"
                  className={classes.inputItem}
                  onChange={this.handleChange}
                  name="firstname"
                  value={this.state.firstname}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Last Name </FormLabel>
                <TextValidator
                  label="Admin Last Name"
                  className={classes.inputItem}
                  onChange={this.handleChange}
                  name="lastname"
                  value={this.state.lastname}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Email ID </FormLabel>
                <TextValidator
                  label="Teacher Email ID"
                  className={classes.inputItem}
                  onChange={this.handleChange}
                  name="emailid"
                  value={this.state.emailid}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Contact Number </FormLabel>
                <TextValidator
                  label="Mobile Number"
                  className={classes.inputItem}
                  name="cellnumber"
                  withRequiredValidator
                  onChange={this.handleChange}
                  value={this.state.cellnumber}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />

              </div>
              {!(this.props.accountId && this.props.accountId.length > 0) &&
              <div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span">Temp Password </FormLabel>
                <TextValidator
                  label="Temp Password"
                  className={classes.inputItem}
                  type="password"
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.password}
                  withRequiredValidator
                  validators={['required', 'maxStringLength:16']}
                  errorMessages={['this field is required', 'Enter between 8 to 16 characters', 'Enter between 8 to 16 characters']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span">Retype Temp Password </FormLabel>
                <TextValidator
                  label="Retype Temp Password"
                  className={classes.inputItem}
                  type="password"
                  onChange={this.handleChange}
                  name="confPassword"
                  value={this.state.confPassword}
                  withRequiredValidator
                  validators={['required', `isStringEqual:${this.state.password}`]}
                  errorMessages={['this field is required', 'Temp Password and Retype Temp Password are different']}
                />
              </div></div>}
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> School Address </FormLabel>
                <TextValidator
                  className={classes.inputItem}
                  label="School Address"
                  onChange={this.handleChange}
                  multiline
                  rows={3}
                  name="schooladdress"
                  value={this.state.schooladdress}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <br></br>
            </CardContent>
            <CardActions>
              <Button type="submit" color="primary" size="small">
                Create
                </Button>
            </CardActions>
          </ValidatorForm>
        </Card>
      </div>
    );

  }
}

CreateAccount.propTypes = {
  accountId: PropTypes.string,
  parentAccountId: PropTypes.string
}

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(CreateAccount));