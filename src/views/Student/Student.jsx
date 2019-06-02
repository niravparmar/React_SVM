import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import PropTypes from 'prop-types';
import Logbook from '../Logbook/Logbook';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';



const styles = theme => ({
    root: {
        // padding : "1",
        marginTop: theme.spacing.unit * 3,
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
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 250,
        maxWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        margin: "20px 0",
        marginRight: "20px",
        backgroundColor: "#57C059",
        textColor: "#fff",
        paddingTop: "7px",
        paddingRight: "26px",
        paddingLeft: "10px",
        paddingBottom: "7px",
        fontSize: "13.7px",
        whiteSpace: "nowrap",
        cursor: "pointer",
        borderRadius: "50px",
    }
});

class Student extends React.Component{
    state = {
        name: '',
        mothername: '',
        fathername: '',
        logbookDialogPatientId: null,
        patientName: '',
        anchorEl: null,
        studentName:''
    };
  
    async componentDidMount() {
        const token = this.props.currentUser.userDetails.accesstoken
        let response = await this.props.authenticatedApiCall('post', '/api/userservice/getstudentdetails', {token:token});
       console.log(response.data)
       let s = response.data
        this.setState({name: s.firstname+" "+s.lastname, mothername:s.mothername, fathername: s.fathername})
    }
    dismissDialog = () => this.setState({ logbookDialogPatientId: null });

    render(){
            const { anchorEl } = this.state;
            const { classes } = this.props;    
            return (
                <div>
                    <GridContainer justify="center">
                        <GridItem md={12}>                            
                            <br></br>
                            {"Student Name is: "+ this.state.name}<br></br>
                            {"Mother Name :"+ this.state.mothername}<br></br>
                            {"Father Name : "+ this.state.fathername}
                            {(this.state.logbookDialogPatientId ? <Logbook studentid={this.state.logbookDialogPatientId} studentName={this.state.studentName} dismiss={this.dismissDialog} /> : "")}
                        </GridItem>
                    </GridContainer>
                </div>
            );
        }
    }
       
export default AuthenticatedPage([1])(Student);