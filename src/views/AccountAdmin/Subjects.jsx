import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import { withStyles } from '@material-ui/core/styles';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator';
import { ValidatorForm } from 'react-material-ui-form-validator-vivek';
import { Button, FormLabel, Card, CardContent, CardActions } from '@material-ui/core';
import SuccessDialog from '../../components/SuccessDialog';

const classOptions = [{ value:1, label:"6th"},{value:2, label:"7th"}, {value:3, label:"8th"}, {value:4, label:"9th"}, {value:5, label:"10th"}, {value:6, label:"11th"}, {value:7, label:"12th"}];
const subjectOptions= [{value:1, label:'Hindi'},{value:2, label:'English'},{value:3, label:'Maths'},{value:4, label:'Science'},{value:5, label:'History'},{value:6, label:'Geography'},{value:7, label:'physics'}, {value:8, label:'Chemistry'}]
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
    OkButton:{
        backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px",  width: "100px"
    },
    textRight: {
        textAlign: "right"
    },
    thirdBtn: { color:"white", backgroundColor: "#db6336", border: "1px solid db6336" , borderRadius: "25px", padding: "7px 15px", },
    primaryBtn: { color: "white", backgroundColor: "green", border: "1px solid db6336", borderRadius: "50px", margin: "8px 0", textAlign: "right", padding: "7px 15px", },
});
class Subjects extends React.Component {
    state = {
        subjectOptions1:[],
        createSubject: false
    };
    setSubjectsData = (data) =>{
        var arr = [];
        data.forEach(subjectObj => {
            subjectOptions.forEach(obj =>{
                if(subjectObj.subjects == obj.value){
                    arr.push(obj)
                }
            })
          })
          this.setState({subjectOptions1: arr})
    }
    //handle class
handleClass = async(value)  => {
    let accountid = this.props.currentAccountId;
    this.setState({ selectedClass: value })
    let response = await this.props.authenticatedApiCall('get', "/api/account/" + accountid + "/assignsubjects/"+value.value);
    if(response!== null){
        this.setSubjectsData(response.data)
    }else{}
}

handleSubjects = (value) =>{
    this.setState({subjectOptions1: value})
}

    //Handle the form submit event
    handleSubmit = async event => {
        let subjects = [];
        let accountid = this.props.currentAccountId;
        for(var i=0;i<this.state.subjectOptions1.length;i++){
            subjects.push(this.state.subjectOptions1[i].value)
        }
        let response = await this.props.authenticatedApiCall('post', "/api/account/" + accountid + "/assignsubjects", {
            subjectOptions: subjects,
            selectedClass: this.state.selectedClass.value
        })
        if(response){
            this.setState({createSubject: true})
            // alert("Record Updated successfully")
        }
    };

    backDashboard = () =>{
        this.setState({createSubject: false})
    }
    handleCloseDialog = () => {
        this.props.closeDialog()
    }
    render() {
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        const BodyText = "Subjects has been updated  Successfully."
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
                                <FormLabel className={classes.labelContainer} component="span"> Select Subjects </FormLabel>
                                <div className={classes.selectContainer}>
                                    <SelectValidator
                                        options={subjectOptions}
                                        placeholder='Select Subjects'
                                        onChange={this.handleSubjects}
                                        value={this.state.subjectOptions1}
                                        checkBoxStyled={true}
                                        isMulti
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </div>
                            </div>
                            <div className={classes.textRight}>
                        <Button onClick={this.handleCloseDialog} className={classes.thirdBtn} size="small" variant="contained" > Close </Button>
                        <Button type="submit" className={classes.primaryBtn} size="small" variant="contained" align="right"> Save </Button>
                        </div>
                    </ValidatorForm>
                    {(this.state.createSubject ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={BodyText} dismiss={this.backDashboard} />: "")}
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage(["AccountAdmin", "DefaultAccountAdmin"])(WithAccount((Subjects))));
