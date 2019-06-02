import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, RadioGroupValidator } from 'react-material-ui-form-validator-vivek';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator'
import { Button, Card, CardContent, FormLabel, CardActions, FormControlLabel, Radio, Typography,Checkbox } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import PropTypes from 'prop-types';
import SuccessDialog from '../../components/SuccessDialog';

const religionOptions = [{ value: 1, label: "Hindu" }, { value: 2, label: "Muslim" }, { value: 3, label: "Shikh" }, { value: 4, label: "Jain" }];
const categoryOptions = [{ value: 1, label: "Genral" }, { value: 2, label: "OBC" }, { value: 3, label: "ST/SC" }];
const localityOptions = [{ value: 1, label: "Urban" }, { value: 2, label: "Rural" }];

var emailID;
const styles = () => ({
    questionContainer: {
        display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px"
    },
    labelContainer: {
        width: "200px", textAlign: "right", marginRight: "35px", fontSize: "14px", fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'",
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
    OkButton:{
        backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px",  width: "100px"
    }
});



class CreateAccount extends React.Component {
    state = {
        fname: "", lname: "", mothername: "", fathername: "", cellnumber: "", dob: "",  gender: "", rollnumber: "", religion: "HINDU", category: "", locality: "", buttonText: "", localaddress: "", parmanentaddress: "", same: "", checkedValue: false, createStudent: false, updateStudent: false
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleReligion = value => {
        this.setState({ religion: value })
    }
    handleCategory = value => {
        this.setState({ category: value })
    }
    handleLocality = value => {
        this.setState({ locality: value })
    }

     //set the provider value for update
     setStateForEditProvider = (data) => {
        this.setState({
            fname: data.firstname,
            lname: data.lastname,
            mothername: data.mothername,
            fathername: data.fathername,
            cellnumber: data.cellnumber,
            rollnumber: data.rollnumber,
            dob: data.dob,
            gender: data.gender,
            parmanentaddress: data.locaddress,
            localaddress: data.locaddress
        })
        religionOptions.forEach(religionObj => {
            if (data.religion == religionObj.value) {
              this.setState({religion : religionObj})
            }
          })
          categoryOptions.forEach(categoryObj => {
            if (data.category == categoryObj.value) {
              this.setState({category : categoryObj})
            }
          })
          localityOptions.forEach(localityObj => {
            if (data.locality == localityObj.value) {
              this.setState({locality : localityObj})
            }
          })
    }


    handleCheckBox = event => {
        if(this.state.checkedValue == true){
            this.setState({checkedValue: false, localaddress: ""})
        }else{this.setState({checkedValue: true, localaddress: this.state.parmanentaddress})}
    }

    async componentDidMount(){
        let studentid = this.props.studentid;
        if(studentid  == undefined) {
            this.setState({ buttonText: 'Registration' })
        } else {
            this.setState({ buttonText: 'Update Student' })
        }
        
        let response = await this.props.authenticatedApiCall('post', '/api/ProviderService/updateStudentDetails', {studentid});
        if (response.data.length > 0) {
            this.setStateForEditProvider(response.data[0])
        } else { }
    }

      //Handle the form submit event
      handleSubmit = async event => {
        let studentid = this.props.studentid;
       
        if (studentid) {
            let response = await this.props.authenticatedApiCall('post', '/api/ProviderService/updateStudent', {
                studentid: studentid,
                fname: this.state.fname,
                lname: this.state.lname,
                mothername: this.state.mothername,
                fathername: this.state.fathername,
                cellnumber: this.state.cellnumber,
                rollnumber: this.state.rollnumber,
                dob: this.state.dob,
                gender: this.state.gender,
                religion: this.state.religion.value,
                category: this.state.category.value,
                locality:  this.state.locality.value,
                paraddress: this.state.parmanentaddress,
                locaddress:  this.state.localaddress
            })
            if(response.data.status == 1)
                this.setState({updateStudent: true})
            else {
                alert('Something Went Wrong');
                event.preventDefault();
            }
        } else {
            let response = await this.props.authenticatedApiCall('post', "/api/ProviderService/studentRegistration", {
                fname: this.state.fname,
                lname: this.state.lname,
                mothername: this.state.mothername,
                fathername: this.state.fathername,
                cellnumber: this.state.cellnumber,
                rollnumber: this.state.rollnumber,
                dob: this.state.dob,
                gender: this.state.gender,
                religion: this.state.religion.value,
                category: this.state.category.value,
                locality:  this.state.locality.value,
                paraddress: this.state.parmanentaddress,
                locaddress:  this.state.localaddress
            })
            if (response.data.status == 1){
                this.setState({createStudent: true})
            }  
            else
                alert('Something went wrong');
            event.preventDefault();
        }
    };
    backDashboard = () =>{
        this.setState({createStudent: false})
        this.props.history.push(`./studentlist`)
    }
        backDashboardUpdate = () =>{
        this.setState({updateStudent: false})
        this.props.history.push(`../studentlist`)
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const OkButtonUpdate = [<Button className={classes.OkButton} onClick={this.backDashboardUpdate}>Ok</Button>]
        const HeaderText = "Success"
        const BodyText = "Student Created Successfully."
        const UpdateBodyText = "Student Updated Successfully"
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
                                <FormLabel className={classes.labelContainer} component="span"> Mother Name </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Mother Name"
                                    onChange={this.handleChange}
                                    rows={5}
                                    name="mothername"
                                    value={this.state.mothername}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Mother Name is required']}
                                />
                                <FormLabel className={classes.labelContainer} component="span"> Father Name </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Father Name"
                                    onChange={this.handleChange}
                                    rows={5}
                                    name="fathername"
                                    value={this.state.fathername}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Father Name is required']}
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
                                <FormLabel className={classes.labelContainer} component="span"> Roll Number </FormLabel>
                                <TextValidator
                                    className={classes.inputItem}
                                    label="Roll Number"
                                    onChange={this.handleChange}
                                    rows={5}
                                    name="rollnumber"
                                    value={this.state.rollnumber}
                                    withRequiredValidator
                                    validators={['required']}
                                    errorMessages={['Roll Munber is required']}
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
                            <br /><br />
                            <hr />
                            <br />
                            <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Religion </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={religionOptions}
                                        placeholder='Select Religion'
                                        onChange={this.handleReligion}
                                        value={this.state.religion}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Religion is required']}
                                    />
                                </div>
                                <FormLabel className={classes.labelContainer} component="span"> Category </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={categoryOptions}
                                        placeholder='Select Category'
                                        onChange={this.handleCategory}
                                        value={this.state.category}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Category is required']}
                                    />
                                </div>
                                <FormLabel className={classes.labelContainer} component="span"> Locality </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={localityOptions}
                                        placeholder='Select Locality'
                                        onChange={this.handleLocality}
                                        value={this.state.locality}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Locality is required']}
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
                    {(this.state.createStudent ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={BodyText} dismiss={this.OkButton} />: "")}
                    {(this.state.updateStudent ? <SuccessDialog successButton={OkButtonUpdate} HeaderText={HeaderText} BodyText={UpdateBodyText} dismiss={this.backDashboardUpdate} />: "")}
                </Card>
            </div>
        );

    }
}

CreateAccount.propTypes = {
    accountId: PropTypes.string,
    parentAccountId: PropTypes.string
}

export default withStyles(styles)(AuthenticatedPage("Provider")(CreateAccount));