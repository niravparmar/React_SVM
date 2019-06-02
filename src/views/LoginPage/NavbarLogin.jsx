import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.jpg';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';

function Logout(){
  axios.get('/api/providerauthservice/signout').then(response =>
    {
      console.log(response);  
    })
  window.location.href = "/public/Login"
}
const styles = theme => ({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    // menuButton: {
    //   marginLeft: -12,
    //   marginRight: 20,
    //   marginTop : 3
    // },
    button : {
      marginRight: 20,
    display: "block",
    backgroundColor: "#57C059",
    textColor : "#fff",
    paddingTop: "7px",
    paddingRight : "26px", 
    paddingLeft : "10px",
    paddingBottom : "7px",
    fontSize: "13.7px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    borderRadius: "50px",
    }   
  });
function Navbar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" >
        <Toolbar style={{paddingLeft:"0"}}>
          <Grid>
            <Typography variant="h3" color="inherit" style={{background:"#000",padding:"2px 3px"}}>
              <img src={logo} alt="logo" />
            </Typography>
          </Grid>
          <div style={{width:"100%"}}>
            {props.Nav.map((links,i)=>
              <div key={i}>{links}</div>
                )}
            
          </div>
          </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
