import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import PatientList from './PatientList';
import Navbar from '../../components/Navbar';
import {NavLink } from 'react-router-dom'
import { Switch, Route, Redirect } from "react-router-dom";
import SessionTimer from '../../TimeOutRenderer';
import { Menu, Button }from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import CreateStudent from './CreateStudent';
import CreateQuestion from './CreateQuestion';
import QuestionList from './QuestionList';
const styles = theme => ({
    navLink: {
        padding:"5px 15px",
        textDecorationLine: "none",
        display:"inline-flex", 
        float: "left"
    },
    CustomAlgoBtn:{
        textTransform:"capitalize",
        padding:"5px 15px"
    },
    headPop:{
        float:"right",
        padding:"12px 8px"
    }
});
class CoWorker extends React.Component {
    state = {
        accounts: [],
        accountid: null,
        providers: [],
        providerid: null,
        patients: [],
        anchorEl: null,
    };
    render() {
        console.log(this.props)
        const { classes, match} = this.props;
        const { anchorEl } = this.state;
        var Nav = [
            <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
                className={classes.headPop}
            >
                <FontAwesomeIcon icon={faCog} />
            </Button>,
            <Menu className={classes.root}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handlepopClose}
            >
                <MenuItem onClick={this.handlepopClose}><NavLink to={`/provider/switch`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Switch Request</NavLink></MenuItem>
                <MenuItem onClick={this.handleuserguide}>User Guide</MenuItem>
            </Menu>,
            <NavLink to={`${match.url}/patientlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            <NavLink to={`${match.url}/create-student`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
            <NavLink to={`${match.url}/create-question`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Create Question</NavLink>,
            <NavLink to={`${match.url}/view-question`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>View Questions</NavLink>
        ];
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />
                <Navbar Nav={Nav} />
                <Switch>
                    <Route path={`${match.url}/edit-question/:questionid`} render={(props) => <CreateQuestion questionid={props.match.params.questionid} key={props.match.params.questionid} />}/>
                    <Route path={`${match.url}/create-student`} component={CreateStudent} {...this.props} />
                    <Route path={`${match.url}/patientlist`} component={PatientList} {...this.props} />
                    <Route path={`${match.url}/create-question`} component={CreateQuestion} {...this.props} />
                    <Route path={`${match.url}/view-question`} component={QuestionList} {...this.props} />
                    <Redirect to={`${match.url}/patientlist`} ></Redirect>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["CoWorker"])(CoWorker));