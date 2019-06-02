import React, { Component } from 'react';
import {AccountContextProvider,WithAccount} from '../AccountContext';
import AuthenticatedPage from "../AuthenticatedPage";
import Navbar from '../../components/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import TeachersList from './TeachersList';
import CreateTeacher from './CreateTeacher';
import BulkProviderImport from './BulkProviderImport';
import { NavLink } from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Select from 'mui-select-with-search-vivek';
import FormControl from '@material-ui/core/FormControl'
import CreateAccount from './CreateTeacher';
import SessionTimer from '../../TimeOutRenderer';
import StudentsList from './StudentsList';
import ManageSubjects from './ManageSubjects';
const styles = theme => ({
    selectItemWrapper:{
        display:'inline-Flex',
        alignItems:'center',
        margin:"10px"
    },
    navLink: {
        padding:"5px 15px",
        textDecorationLine: "none",
        display:"inline-flex", 
        float: "left"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
      selectLink:{
        float:"right",
        display:"inline-flex",
        margin:"0",
        minWidth: "200px"
    },
});




class AccountAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopUp: false,
            loading:true,
            account: "",
            accounts: [],
            selectedAccountId:"",
            age: '',
            name: 'hai',
            labelWidth: 0,
        }
    }



    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/account', null)

        if (response.data.length === 1) {

            this.setState({
                account:{value:response.data[0].accountid,label:response.data[0].accountname},
                selectedAccountId:response.data[0].accountid,
                loading:false
            })
            // this.getEmergencyDetails();
        }
        else if (response.data.length > 1) {
            let labelsArray =  response.data.map((item) => {
                return {value:item.accountid,label:item.accountname}
            });
            this.setState({
                openPopUp: true,
                accounts: labelsArray,
                loading:false
            })
        }
    }

    // getEmergencyDetails = async function() {
    //     let emergencyInfoDetails = await this.props.authenticatedApiCall("get","/api/ProviderService/getAlgo?&_accountid="+this.state.account.value,null)
    //     if(emergencyInfoDetails.data){
    //         if(emergencyInfoDetails.data.isEmergency && (emergencyInfoDetails.data.hypohyperrange== null || emergencyInfoDetails.data.hypohyperrange.entryCount ==0)){
    //             this.saveEmergencyInfo(emergencyInfoDetails.data.hypohyperrange);
    //             this.props.history.push(`./emergencyInfo`);
    //         }
    //     }
    // }

    handleClose = async () => {
        this.getEmergencyDetails();
        this.setState({ openPopUp: false,selectedAccountId:this.state.account.value });
    };

    // preparedata = function (hypohyperrange) {
    //     var data={};
    //     if(hypohyperrange == null){
    //     data.hypoMax = 50;
    //     data.hypoText = "If your blood sugar remains low when you test again, the app will prompt you to eat or drink additional fast acting carbs. Call 911 if you feel this is a medical emergency."
    //     data.hyperMin = 300;
    //     data.hyperText ="Please contact 911 or your doctor if this is a medical emergency. Please retest your blood sugar in 3 hours"
    //     }
    //     else{
    //         data.hypoMax = hypohyperrange.hypoglycemiamax;
    //         data.hypoText = hypohyperrange.hypoglycemiatext
    //          data.hyperMin = hypohyperrange.hyperglycemiamin;
    //         data.hyperText = hypohyperrange.hyperglycemiatext 
    //     }
    //     return data;
    // }

    // saveEmergencyInfo = async function(hypohyperrange){
    //     let dataToSend = this.preparedata(hypohyperrange);
    //     let response = await this.props.authenticatedApiCall("POST","/api/emergencyinfo/saveAdminEmergencydetails?&_accountid="+this.state.account.value,dataToSend)
    //     if(response.status!==200){
    //         alert("Emergency Info Not Saved")
    //     }
    // }

    handleAccountChange = (selectedValue) => {
        this.setState({
            account: selectedValue,
            selectedAccountId:selectedValue.value,
        })
    }

    render() {
        const { match } = this.props;
        const { classes } = this.props;
        var Nav = [
            <FormControl className={classes.selectLink+" "+classes.formControl}>
                {/* <InputLabel htmlFor="Account Admin">Account Admin</InputLabel> */}
                <Select
                    native
                    value={this.state.account}
                    onChange={this.handleAccountChange}
                    options={this.state.accounts}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    inputProps={{
                    name: 'admin',
                    id: 'admin',
                    }}
                >
                </Select>
            </FormControl>,
            <NavLink to={`${match.url}/teacherlist`} accountid={this.state.accountid} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            <NavLink to={`${match.url}/create-user`} accountid={this.state.accountid} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create User</NavLink>,
            <NavLink to={`${match.url}/manage-subjects`} accountid={this.state.accountid} className={classes.navLink} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Manage Subjects</NavLink>,
            
        ];
        // console.log(this.props)
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                { (this.state.selectedAccountId === undefined || this.state.selectedAccountId === '')?
                (<Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={(this.state.openPopUp )}
                    disableBackdropClick>
                    <DialogContent >
                        <div className = {this.props.classes.selectItemWrapper}>
                        <InputLabel>Select an account to manage</InputLabel>
                        <FormControl
                            style={{ width: 350 }}
                        >
                            <Select
                                value={this.state.account}
                                onChange={this.handleAccountChange}
                                options={this.state.accounts}
                                placeholder='Choose an account to manage'
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            >
                            </Select>
                        </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled = {!this.state.account} onClick={this.handleClose} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>):''}
                <Navbar Nav={Nav} />

                <AccountContextProvider value={this.state.selectedAccountId}>
                    <Switch>
                        <Route path={`${match.url}/studentslist/:teacherid`} render = {(props) => <StudentsList teacherid={props.match.params.teacherid} {...props} />}/>
                        <Route path={`${match.url}/manage-subjects`} component={WithAccount(ManageSubjects)}  />
                        <Route path={`${match.url}/edit-account/:teacherid`} render={(props) => <CreateTeacher teacherid={props.match.params.teacherid} {...props} />}/>
                        <Route path={`${match.url}/teacherlist`} component={WithAccount(TeachersList)}  />
                        <Route path={`${match.url}/create-user`} component={WithAccount(CreateTeacher)}  />
                        <Redirect to={`${match.url}/teacherlist`} ></Redirect>
                    </Switch>
                </AccountContextProvider>
            </div>
        );
    }
}
 
export default withStyles(styles)(AuthenticatedPage(["AccountAdmin", "DefaultAccountAdmin"])(AccountAdmin));
