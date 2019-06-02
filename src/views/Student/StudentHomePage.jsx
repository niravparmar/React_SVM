import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import SessionTimer from '../../TimeOutRenderer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Student from './Student';
import {studentObj, StudentContextProvider } from '../StudentContext';
import Result from './Result';
import Attendance from './Attendance';

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
class StudentHomePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            accounts: [],
            accountid: null,
            providers: [],
            providerid: null,
            patients: [],
            openPopUp:true,
            checkedDontShow: '',
            anchorEl: null,
            studentDetails: studentObj,
            changeStudent: this.changeStudent
        };
    }
   
    changeStudent = (userObj) =>{
        if(userObj){
          this.setState({studentDetails: userObj})
        }else{
          this.setState({studentDetails: studentObj})
        }
    }
  
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
        const { match } = this.props;
        const { classes } =this.props;
        const { anchorEl } = this.state;
      
        var Nav = [
 
            <Menu className={classes.root}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handlepopClose}
            >
                
            </Menu>,
            <NavLink to={`${match.url}/student`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            <NavLink to={`${match.url}/result`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "blue" }}>Result</NavLink>,
            <NavLink to={`${match.url}/attendance`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "blue" }}>Attendance</NavLink>,
            <NavLink to={`${match.url}/notes`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "blue" }}>Notes</NavLink>,

        ];
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />

                <Navbar Nav={Nav} />
                <StudentContextProvider value = {this.state}>
                <Switch>
                    <Route path={`${match.url}/student`} component={Student}  />
                    <Route path={`${match.url}/result`} render={(props) => <Result studentid={this.props.currentUser.userDetails.studentid} key={this.props.currentUser.userDetails.studentid} />}/>
                    <Route path={`${match.url}/attendance`} render={(props) => <Attendance studentid={this.props.currentUser.userDetails.studentid} key={this.props.currentUser.userDetails.studentid} />}/>
                    <Redirect to={`${match.url}/student`} ></Redirect>
                </Switch>
                </StudentContextProvider>
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage([1])(StudentHomePage));
