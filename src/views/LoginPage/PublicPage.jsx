import React from 'react';
import {Route, Redirect, Switch } from 'react-router-dom'
import Login from "./LoginPage";
import LoginHome from "./LoginHome";
import ForgetPassword from "./ForgetPassword";
import BGimage from '../../assets/images/bg-login.jpg';
import AdminImage from '../../assets/images/te.jpg';
import StudentImage from '../../assets/images/st.jpg';
import logo from '../../assets/images/logo-login.png';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Navbar from './NavbarLogin';
import { withStyles } from '@material-ui/core/styles';

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

class PublicPage extends React.Component {
    render() {
        const { match, classes } = this.props;
        var Nav = [
            <NavLink to={`${match.url}/teachers`}  className={classes.navLink} activeClassName="active" activeStyle={{fontWeight: "bold",color: "red"}}>Admin Login</NavLink>,
            <NavLink to={`${match.url}/students`}  className={classes.navLink} activeClassName="active" activeStyle={{fontWeight: "bold",color: "red"}}>Student Login</NavLink>
        ];
        return (
           
            <div key = {this.props} //to make sure that page is re initialised if language is changed
                style={{
                    backgroundImage: "url(" + BGimage + ")",
                    backgroundRepeat: "repeat-x",
                    paddingTop: "0%",
                    backgroundPosition: "top center"
                }}
            > <Navbar Nav={Nav} />
                <div
                //className={classes.container}
                >
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <div style={{ textAlign: "center" }}>
                               
                            </div>
                            
                                <Switch>
                                    <Route path={this.props.match.url + "/ForgetPassword"} component={ForgetPassword} />
                                    <Route path={this.props.match.url + "/students"} component={LoginHome} />
                                    <Route path={this.props.match.url + "/teachers"} component={Login} />
                                    {/* <Redirect to={this.props.match.url + "/LoginHome"} /> */}
                                    <Redirect to={this.props.match.url + "/teachers"} />
                                </Switch>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default (withStyles(styles)(PublicPage));
