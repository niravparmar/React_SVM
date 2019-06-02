import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AuthenticatedPage from "./AuthenticatedPage";
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator-vivek';
import Grid from "@material-ui/core/Grid";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
    root: {
        // padding : "1",
        marginTop: theme.spacing.unit * 5,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,

    },
    backGround: {
        backgroundColor: "#f1f1f1",
    },
    button: {
        float: "right"
    },
    textView: {
        width: "80%"
    }
});

class EmergencyInfo extends React.Component {
    state = {
        HypoMax: "",
        HyperMin: "",
        HypoText: "",
        HyperText: "",
        openPopUp: false,
        popUpMsg: "",
        countryId : "",
        emergencyInfoChoice :"",
    }
    fetchEmergencyDetails = async () => {
        let api;
            if (this.props.currentUser.userDetails.role === 'Provider') {
                api = "/api/emergencyinfo/getEmergencydetails";
            }
            else {
                api = "/api/emergencyinfo/getAdminEmergencydetails?&_accountid=" + this.props.currentAccountId;
            }
            if (this.props.currentUser.userDetails.role === 'Provider' || this.props.currentAccountId) {
                let response = await this.props.authenticatedApiCall("get", api, null)
                if (response.data) {
                    this.setState({
                        HypoMax: response.data.hypoMax,
                        HyperMin: response.data.hyperMin,
                        HypoText: response.data.hypoText,
                        HyperText: response.data.hyperText,
                        countryId: response.data.countryid,
                        emergencyInfoChoice :response.data.doctorEmergencyInfo
                    })
                }
            }
    }
    async componentDidMount() {
        // if (!this.props.hypoHyperRange) {
            this.fetchEmergencyDetails();
        // }
        // else{
        //     this.setState({
        //         HypoMax: this.props.hypoHyperRange.hypoglycemiamax,
        //         HyperMin: this.props.hypoHyperRange.hyperglycemiamin,
        //         HypoText: this.props.hypoHyperRange.hypoglycemiatext,
        //         HyperText: this.props.hypoHyperRange.hyperglycemiatext,
        //         validationRange: 'maxNumber:'+this.props.validationRange
        //     })
        // }
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleOptInSubmit = async () => {
        let response = await this.prepareDataAndSaveData(true);
        this.fetchEmergencyDetails();
        this.setState({
            openPopUp: true,
            popUpMsg: "you have enabled this facility to your patients",
        })
    }
    handleOptOutSubmit = async () => {
        let response = await this.prepareDataAndSaveData(false);
        this.fetchEmergencyDetails();
        this.setState({
            openPopUp: true,
            popUpMsg: "you have disabled this facility to your patients, to enable click on Opt In",
        })
    }
    prepareData(emergencyInfoChoice){
        let data ={};
        console.log(this.state)
        data.hypoMax = this.state.HypoMax;
        data.hypoText = this.state.HypoText;
        data.hyperMin = this.state.HyperMin;
        data.hyperText = this.state.HyperText;
        data.emergencyInfoChoice = emergencyInfoChoice
        return data;
    }
    prepareDataAndSaveData = async(emergencyInfoChoice) => {
        var data = {};
        let api;
        data = this.prepareData(emergencyInfoChoice);
        if (this.props.currentUser.userDetails.role === 'Provider') {
            api = "/api/emergencyinfo/saveEmergencydetails";
        }
        else {
            api = "/api/emergencyinfo/saveAdminEmergencydetails?&_accountid=" + this.props.currentAccountId;
        }
        let response = await this.props.authenticatedApiCall("POST", api, data);
        return response
    }
    handleSubmit =  () => {
        let response = this.prepareDataAndSaveData();
        
        this.setState({
            openPopUp: true,
            popUpMsg: response.data.statusDescription
        })
    };
    handleClose = (event) => {
        this.setState({ openPopUp: false });
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* <Paper className={classes.root} elevation={1} > */}
                    <Typography ><b>Medical Emergencies</b></Typography>
                    <div className={classes.backGround}>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <CardBody>
                                <Grid
                                    container
                                    spacing={4}
                                >
                                    <Grid item xs={12} lg={6}>
                                        <Typography><b>Hypoglycemia</b> Emergency Range</Typography>
                                        <Typography>Enter a glucose value of 50 mg/dL or lower that represents a
                                            hypoglycemic medical emergency. The text in the box below will be displayed
                                            to the patient if they have a glucose test in the range you set.
                                        </Typography>
                                        <TextValidator
                                            disabled = {!this.state.emergencyInfoChoice}
                                            // type="number"
                                            className={classes.inputItem}
                                            label="Hypo Max"
                                            onChange={this.handleChange}
                                            rows={5}
                                            maxlength={3}
                                            name="HypoMax"
                                            value={this.state.HypoMax}
                                            withRequiredValidator
                                            validators={['required', 'maxNumber:50']}
                                            errorMessages={['this field is required', "Hypo Emergency value can't be greater than the default hypo value"]}
                                        />
                                        <Typography>mg/dL </Typography><br></br>
                                        <TextValidator
                                            disabled = {!this.state.emergencyInfoChoice}
                                            className={classes.textView}
                                            label="Hypo Text"
                                            onChange={this.handleChange}
                                            multiline
                                            variant="outlined"
                                            rows={5}
                                            name="HypoText"
                                            value={this.state.HypoText}
                                            withRequiredValidator
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Typography><b>Hyperglycemia</b> Emergency Range</Typography>
                                        <Typography>Enter a glucose value of 300 mg/dL or higher that represents a
                                            hyperglycemic medical emergency. The text in the box below will be displayed
                                            to the patient if they have a glucose test in the range you set.
                            </Typography>
                                        <TextValidator
                                            disabled = {!this.state.emergencyInfoChoice}
                                            className={classes.inputItem}
                                            label="Hyper Min"
                                            onChange={this.handleChange}
                                            rows={5}
                                            name="HyperMin"
                                            value={this.state.HyperMin}
                                            withRequiredValidator
                                            validators={['required', 'minNumber:300']}
                                            errorMessages={['this field is required', "Hyper Emergency value can't be lesser than the default hyper value"]}
                                        />
                                        <Typography>mg/dL</Typography><br></br>
                                        <TextValidator
                                            disabled = {!this.state.emergencyInfoChoice}
                                            className={classes.textView}
                                            label="Hyper Text"
                                            onChange={this.handleChange}
                                            multiline
                                            variant="outlined"
                                            rows={5}
                                            name="HyperText"
                                            value={this.state.HyperText}
                                            withRequiredValidator
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    </Grid>
                                </Grid>
                            </CardBody>
                            <CardFooter>
                            {console.log(!(this.state.doctorEmergencyInfo))}
                                 <div className={classes.button} >
                                    {this.props.currentUser.userDetails.role ==='Provider'&& this.state.countryId === 2 &&
                                        <span>
                                            {!this.state.emergencyInfoChoice === true ?
                                                <Button onClick ={this.handleOptInSubmit} color="primary">Opt In</Button>:
                                                <Button onClick ={this.handleOptOutSubmit} color="primary">Opt Out</Button>}
                                        </span>
                                    }
                                    <Button type="submit" color="primary">Update</Button>
                                </div>
                            </CardFooter>
                        </ValidatorForm>
                    </div>
                    <Dialog
                        onClose={this.handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={this.state.openPopUp}>
                        <DialogContent >{this.state.popUpMsg}</DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">OK</Button>
                        </DialogActions>
                    </Dialog>
                {/* </Paper> */}
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["Provider", "AccountAdmin"])(EmergencyInfo));