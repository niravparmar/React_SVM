import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import AuthenticatedPage from "../AuthenticatedPage";
import ActionButton from './ActionButtonForSuperAdmin';
import queryString from 'query-string';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import SuccessDialog from '../../components/SuccessDialog';

// let counter = 0;
const styles = theme => ({
    root: {
        // padding : "1",
        marginTop: theme.spacing.unit * 0.5,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
       
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    OkButton:{
        backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px",  width: "100px"
    }
});

class ManageAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        rows: [],
        page: 0,
        rowsPerPage: 5,
        isLocked: false,
        isUnlocked: false
    };
}     

tableheads1 = [
    {
        name: "status",
        label: "Status",
        options: {
            filter: false,
            sort: true,
            searchable: true,
            customBodyRender : (value)=>{
                return <p style={{ width: "100px" }}><b>{value}</b></p>
            }
        }
    },

    {
        name: "accountname",
        label: "School Name",
        options: {
            filter: false,
            sort: true,
            searchable: true,
            customBodyRender : (value)=>{
                return <p style={{ width: "100px" }}><b>{value}</b></p>
            }
        }
    },

    {
        name: "accountrefnumber",
        label: "Registration No.",
        options: {
            filter: true,
            sort: true,
            searchable: true
        }
    },
    {
        name: "name",
        label: "Principal",
        options: {
            filter: false,
            sort: true,
            searchable: true,
            customBodyRender : (value)=>{
                return <p style={{ width: "100px" }}><b>{value}</b></p>
            }
        }
    },
    {
        name: "emailid",
        label: "Email Id",
        options: {
            filter: false,
            sort: false,
            searchable: true
        }
    },
    {
        name: "cellnumber",
        label: "Contact no.",
        options: {
            filter: false,
            sort: false,
            searchable: true
        }
    },
    {
        name: "Action",
        label: "Action",
        options: {
            filter: false,
            sort: false,
            print : false,
            customBodyRender: (value) => {
                return (
                    <ActionButton accountid={value.accountid} status={value.status} handleUnlockAccount={this.onHandleUnlockAccount} handleLockAccount = {this.onHandleLockAccount} handleEditAccountClick={this.onHandleEditAccount}/>
                )
            }
        }
    },

];
//Inactivate the account
   onHandleLockAccount = async (accountid) =>{
    let response = await this.props.authenticatedApiCall('put','/api/account/'+accountid + '/lockaccount',null);
    if(response.data.status == 1){
        this.setState({isLocked: true})
    }else{alert("Not able to lock the ccount")}
}

//Deactivate the account
onHandleUnlockAccount = async (accountid) =>{
 let response = await this.props.authenticatedApiCall('put','/api/account/'+accountid + '/unlockaccount',null);
 if(response.data.status == 1){
     this.setState({isUnlocked: true})
 }else{alert("Not able to lock the ccount")}
}
//Edit Account
onHandleEditAccount = (accountId) =>{
        this.props.history.push('./edit-account/'+accountId);
    }

    //fetching the data from API
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get','/api/account/all?withdetails=true',null)
    
        if (response.data.length > 0) {
            response.data.forEach((item) => {
                console.log(item.status)
                        item.name = item.lastname +" "+item.firstname;
                        item.Action = { accountid : item.accountid, status: item.status }  
                        if(item.status == 1){ item.status = 'Active'}
                        else if(item.status == 2){item.status = 'Inactive'}
                        else if(item.status == 3){item.status = 'Lock'}                                                                      
            });
            
            this.setState({
                rows: response.data
            })
        }
    }

    backDashboard1 = () =>{
        this.props.history.push(`./manage-account`)
        this.setState({isLocked: false})
    }
        backDashboardUpdate = () =>{
            var parsed = {}
            parsed.reloadTo = 'manage-account';
            parsed.timeOut = '200';
            const stringified = queryString.stringify(parsed);
            this.props.history.push({
                pathname : `./formReloader`,
                search : "?"+stringified});
        this.setState({isUnlocked: false})
    }
    backDashboard = () => {
        this.setState({isLocked: false}) 
        var parsed = {}
        parsed.reloadTo = 'manage-account';
        parsed.timeOut = '200';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname : `./formReloader`,
            search : "?"+stringified});
    }
    render() {
        const {classes} = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const OkButtonUpdate = [<Button className={classes.OkButton} onClick={this.backDashboardUpdate}>Ok</Button>]
        const HeaderText = "Success"
        const BodyText = "Account has been locked Successfully."
        const UpdateBodyText = "Account hass been unlocked Successfully"
        return (
            <div>
        <MuiThemeDataTable title ={'Accounts'} rows={this.state.rows} columns={this.tableheads1} />
        {(this.state.isLocked ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={BodyText} dismiss={this.backDashboard} />: "")}
        {(this.state.isUnlocked ? <SuccessDialog successButton={OkButtonUpdate} HeaderText={HeaderText} BodyText={UpdateBodyText} dismiss={this.backDashboardUpdate} />: "")}        </div>
        );
    }
}

ManageAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(ManageAccount));
