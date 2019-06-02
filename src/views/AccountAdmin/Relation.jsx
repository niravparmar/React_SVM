import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles } from '@material-ui/core/styles';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator';
import { ValidatorForm } from 'react-material-ui-form-validator-vivek';
import { Button, FormLabel, Card, CardContent, CardActions } from '@material-ui/core';
import SuccessDialog from '../../components/SuccessDialog';

const classOptions = [{ value:1, label:"6th"},{value:2, label:"7th"}, {value:3, label:"8th"}, {value:4, label:"9th"}, {value:5, label:"10th"}, {value:6, label:"11th"}, {value:7, label:"12th"}];
const sectionOptions = [{value:1, label:"A"}, {value:2, label:"B"}, {value:3, label:"C"}, {value:4, label:"D"}, {value:5, label:"E"}]
const sessionOptions= [{value:1, label:'2019-20'},{value:2, label:'2020-21'},{value:3, label:'2021-22'},{value:4, label:'2022-23'},{value:5, label:'2023-24'},{value:6, label:'2024-25'},{value:7, label:'2025-26'}]
const styles = () => ({
    questionContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "15px"
    },
    labelContainer: {
        width: "100px",
        textAlign: "right",
        marginRight: "35px"
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
        position: "absolute",
        right: '10%'

    },
    textRight: {
        textAlign: "right"
    },
    OkButton:{
        backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px",  width: "100px"
    },
    thirdBtn: { color:"white", backgroundColor: "#db6336", border: "1px solid db6336" , borderRadius: "25px", padding: "7px 15px", },
    primaryBtn: { color: "white", backgroundColor: "green", border: "1px solid db6336", borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", },
});
class Relation extends React.Component {
    state = {
        ProviderList: [],
        selectedClass: null,
        selectedSection: null,
        sessionOptions: null,
        assignClassSuccess: false
    };
    //handle class
handleClass = value => {
    this.setState({ selectedClass: value })
}

//handle Section
handleSection = value => {
    this.setState({ selectedSection: value })
}
handleSession = (value) =>{
    console.log(value)
    this.setState({sessionOptions: value})
}
setAssignClass = (data) =>{    
    classOptions.map(classObj =>{
        if(data.result[0].class == classObj.value){
            this.setState({selectedClass: classObj})
        }
    })
    sectionOptions.map(sectionObj =>{
        if(data.result[0].section == sectionObj.value){
            this.setState({selectedSection: sectionObj})
        }
    })
    sessionOptions.map(sessionObj =>{
        if(data.result[0].session == sessionObj.value){
            this.setState({sessionOptions: sessionObj})
        }
    })
}
async componentDidMount(){
    let teacherid = this.props.teacherid;
    let accountid = this.props.currentAccountId;
    let response = await this.props.authenticatedApiCall('get', "/api/account/" + accountid + "/"+ teacherid +"/getAssignedClass", );
    if(response.data){
        this.setAssignClass(response.data)
    }

}
    //Handle the form submit event
    handleSubmit = async event => {
        let accountid = this.props.currentAccountId;
        let teacherid = this.props.teacherid;
        let response = await this.props.authenticatedApiCall('post', "/api/account/" + accountid + "/" + teacherid+"/assignclass",
        {
            selectedClass: this.state.selectedClass.value,
            selectedSection: this.state.selectedSection.value,
            sessionOptions: this.state.sessionOptions.value
        })
        if(response){
            this.setState({assignClassSuccess: true})
        }
    };

    handleAssignClass = () => {
        this.props.closeDialog()
    }
    backDashboard = () =>{
        this.setState({assignClassSuccess: false})
        // this.props.history.push(`./teacherlist`)
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        const BodyText = "Student Created Successfully."
        return (
            <div><br></br>
                    <Card className={classes.cardRoot}>
                    <ValidatorForm onSubmit={this.handleSubmit}>
                    <div className={classes.questionContainer}>
                                <FormLabel className={classes.labelContainer} component="span"> Class </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={classOptions}
                                        placeholder='Select Class'
                                        onChange={this.handleClass}
                                        value={this.state.selectedClass}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Class is required']}
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </div>
                                <FormLabel className={classes.labelContainer} component="span"> Section </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={sectionOptions}
                                        placeholder='Select Section'
                                        onChange={this.handleSection}
                                        value={this.state.selectedSection}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Section is required']}
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </div>
                                <FormLabel className={classes.labelContainer} component="span"> Session </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={sessionOptions}
                                        placeholder='Select Session'
                                        onChange={this.handleSession}
                                        value={this.state.sessionOptions}
                                        withRequiredValidator
                                        validators={['required']}
                                        fullWidth
                                        errorMessages={['Session is required']}
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </div>
                            </div>
                            <div className={classes.textRight}>
                        <Button onClick={this.handleAssignClass} className={classes.thirdBtn} size="small" variant="contained" > Close </Button>
                        <Button type="submit" className={classes.primaryBtn} size="small" variant="contained" align="right"> Save </Button>
                        </div>
                    </ValidatorForm>
                    {(this.state.assignClassSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={BodyText} dismiss={this.backDashboard} />: "")}
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage(["AccountAdmin", "DefaultAccountAdmin"])(WithAccount((Relation))));
