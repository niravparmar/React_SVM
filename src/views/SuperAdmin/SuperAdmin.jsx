import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles } from '@material-ui/core/styles';
import ManageAccount from "./ManageAccount";
import StudentList from './StudentList';
import {NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";
import CreateAccount from './CreateAccount';
import SessionTimer from '../../TimeOutRenderer';

const styles = theme => ({
    navLink: {
        padding:"5px 15px",
        textDecorationLine: "none",
        display:"inline-flex", 
        float: "right"
    },
    pad60:
    {
        padding:"30px",
    }
});

class SuperAdmin extends React.Component {
    
    render() {
        const { classes } = this.props;
        const { match } = this.props;
        var Nav = [
            <NavLink to={`${match.url}/manage-account`} className={classes.navLink} activeClassName="active" activeStyle={{fontWeight: "bold",color: "red"}}>Manage Accounts</NavLink>,
            <NavLink to={`${match.url}/create-account`} className={classes.navLink} activeClassName="active" activeStyle={{fontWeight: "bold",color: "red"}}>Create Account</NavLink>,
            <NavLink to={`${match.url}/studentlist`} className={classes.navLink} activeClassName="active" activeStyle={{fontWeight: "bold",color: "red"}}>Home</NavLink>
        ];

        return (
            <div>
            <Navbar Nav={Nav} />
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props}/>
            <div className={classes.pad60}> 

                <Switch>
                        <Route path={`${match.url}/editsubaccount/:accountid`} render={(props) => <CreateAccount accountid={props.match.params.accountId} parentAccountId={props.match.params.accountId} {...props} />}  />
                    <Route path={`${match.url}/manage-account`} component={ManageAccount}  />
                    <Route path={`${match.url}/create-account`} component={CreateAccount}  />
                    <Route path={`${match.url}/edit-account/:accountId`} render={(props) => <CreateAccount accountId={props.match.params.accountId} {...props} />}/>
                    <Route path={`${match.url}/studentlist`} component={StudentList}  />
                    <Redirect to={`${match.url}/studentlist`} ></Redirect>
                </Switch>
            </div>
            </div>
        )
    }
}

export default AuthenticatedPage("SuperAdmin")(withStyles(styles)(SuperAdmin));
// export default SuperAdmin;