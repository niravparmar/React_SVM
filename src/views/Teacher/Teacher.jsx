import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { Link } from 'react-router-dom';
import StudentList from './StudentsList';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RegisterStudent from './RegisterStudent';
import { NavLink } from 'react-router-dom'
import { DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ViewResult from './ViewResult';
import SessionTimer from '../../TimeOutRenderer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import CreateResult from './CreateResult';
import CreateAttendance from './CreateAttendance';
import ViewAttendance from './ViewAttendance';
import TeacherOnBoard from './ProviderOnBoard';
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
class Provider extends React.Component {
    state = {
        accounts: [],
        accountid: null,
        providers: [],
        providerid: null,
        patients: [],
        openPopUp:true,
        checkedDontShow: '',
        anchorEl: null,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    handleClose = () => {
        this.setState({
            openPopUp:false
        })
        localStorage.setItem("__warningPopUpShown",this.state.checkedDontShow);
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handlepopClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        // console.log(this.props)
        const { match } = this.props;
        const { classes } =this.props;
        const { anchorEl } = this.state;
        var CustomAlgo = <Link to={{ pathname: `/provider/algo`, state: { accountid: this.state.accountid } }} style={{ textDecorationLine: "none" }}>Custom Algorithm</Link>
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
                <NavLink to={`${match.url}/profile`} className={classes.navLink} style={{ textDecorationLine: "none"}} activeClassName="active" activeStyle={{fontWeight:'bold', color:"red"}}>Profile</NavLink>
            </Menu>,
            <NavLink to={`${match.url}/studentlist`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            <NavLink to={`${match.url}/createstudent`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Registration</NavLink>,
            <NavLink to={`${match.url}/view-results`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>View Result</NavLink>,
            <NavLink to={`${match.url}/view-attendance`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>View Attendance</NavLink>
        ];
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />

                <Navbar Nav={Nav}  />
                <Switch>
                    <Route path={`${match.url}/edit-prescription/:studentid`} render={(props) => <RegisterStudent studentid={props.match.params.studentid} key={props.match.params.studentid} {...props}/>}/>
                    <Route path={`${match.url}/view-attendance`} component={ViewAttendance}  />
                    <Route path={`${match.url}/createstudent`} component={RegisterStudent}  />
                    <Route path={`${match.url}/view-results`} component={ViewResult}  />
                    <Route path={`${match.url}/studentlist`} component={StudentList}  />
                    <Route path={`${match.url}/profile`} component={TeacherOnBoard} />
                    <Route path={`${match.url}/create-result/:studentid`}  render={(props) => <CreateResult studentid={props.match.params.studentid} key={props.match.params.studentid} />}/>
                    <Route path={`${match.url}/create-attendance/:studentid`}  render={(props) => <CreateAttendance studentid={props.match.params.studentid} key={props.match.params.studentid} />}/>
                    <Redirect to={`${match.url}/studentlist`} ></Redirect>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["Provider"])(Provider));