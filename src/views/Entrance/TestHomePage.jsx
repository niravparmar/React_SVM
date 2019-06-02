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
import Entrance from './Entrance';


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
class TestHomePage extends React.Component {
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
        const { classes,  match } =this.props;
        const { anchorEl } = this.state;
        var Nav = [
 
            <Menu className={classes.root}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handlepopClose}
            >
                
            </Menu>,
            <NavLink to={`${match.url}/entrance`} className={classes.navLink} style={{ textDecorationLine: "none" }} activeClassName="active" activeStyle={{ fontWeight: "bold", color: "red" }}>Home</NavLink>,
            
        ];
        return (
            <div>
                <SessionTimer userTimer={this.props.currentUser.userTimer} {...this.props} />

                <Navbar Nav={Nav} />
                <Switch>
                    <Route path={`${match.url}/entrance`} component={Entrance}  />
                    <Redirect to={`${match.url}/entrance`} ></Redirect>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage([2])((TestHomePage)));