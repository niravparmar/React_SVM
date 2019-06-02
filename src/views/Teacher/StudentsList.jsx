import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ActionButton from './ActionButtonForProvider';
import PropTypes from 'prop-types';
import Logbook from '../Logbook/Logbook';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import SuccessDialog from '../../components/SuccessDialog';

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
        margin: "20px 0", marginRight: "20px", backgroundColor: "#57C059", textColor: "#fff", paddingTop: "7px", paddingRight: "26px", paddingLeft: "10px", paddingBottom: "7px", fontSize: "13.7px", whiteSpace: "nowrap", cursor: "pointer", borderRadius: "50px",
    },
        OkButton:{
        backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px",  width: "100px"
    }
});

class PatientList extends React.Component {
    state = {
        students: [],
        logbookDialogPatientId: null,
        patientName: '',
        anchorEl: null,
        studentName:'',
        isDelete: false
    };

    tableheads1 = [
        {
            name: "studentid",
            label: "SR. No.",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "roll",
            label: "Roll",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
                searchable: true,
                customBodyRender : (value)=>{
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },

        {
            name: "mothername",
            label: "Mother",
            options: {
                filter: true,
                sort: true,
                searchable: false
            }
        },
        {
            name: "fathername",
            label: "Father",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "cellnumber",
            label: "Mobile",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "dob",
            label: "Birth Date",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "gender",
            label: "Gender",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "religion",
            label: "Religion",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "locality",
            label: "locality",
            options: {
                filter: true,
                sort: true,
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
                        <ActionButton studentid={value.studentid} studentName={value.studentName} onLogBookClick={this.onLogBookClick} inactivateFunction={this.inactivateStudent} editPresctiption = {this.onEditPrescription} createResult={this.createResult} createAttendance = {this.createAttendance}/>
                    )
                }
            }
        }
    ];

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onLogBookClick = (studentid, name) => {
        this.setState({ logbookDialogPatientId: studentid, studentName:name});
    }

    onEditPrescription = (studentid) => {
        this.props.history.push('./edit-prescription/'+studentid);
    }

    createResult = (studentid) =>{
        this.props.history.push('./create-result/'+studentid)
    }
    createAttendance = (studentid) =>{
        this.props.history.push('./create-attendance/'+studentid)
    }
    // Inactivate The Patient
    inactivateStudent = async (studentid) => {
        console.log(studentid)
        let response1 = await this.props.authenticatedApiCall('post', '/api/providerservice/inactivatestudent/', { studentid })

        console.log(response1.data)

        if (response1.data.status == 1) {
            this.setState({isDelete : true })
        } else {

            alert(response1.data.statusDescription);
        }
    }
 
    //Birth Date
    prettyDate(date) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
        return (months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear());
      }
  
    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/ProviderService/getmyPatients', null);
        if (response.data.length > 0) {
            response.data.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.Action = {
                    studentid : item.studentid, studentName:  item.name
                }
                if(item.religion === '1'){item.religion = 'Hindu'}
                else if(item.religion === '2'){item.religion = 'Muslim'}
                else if(item.religion === '3'){item.religion = 'Shikh'}
                else if(item.religion === '4'){item.religion = 'Jain'}

                if(item.category === '1'){item.category = 'Genral'}
                else if(item.category === '2'){item.category = 'OBC'}
                if(item.category === '3'){item.category = 'ST/SC'}

                if(item.locality === '1'){item.locality = 'Urban'}
                else if(item.locality === '2'){item.locality = 'Rural'}
            });
            this.setState({
                students: response.data
            })
        }
    }

    dismissDialog = () => this.setState({ logbookDialogPatientId: null });
    backDashboard = () =>{
        this.props.history.push(`./studentlist`)
        this.setState({isDelete : false})
    }
    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        const BodyText = "Student Deleted Successfully."
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem md={12}>                        
                        <br></br>
                        <MuiThemeDataTable title ={'Students List'} rows={this.state.students} columns={this.tableheads1} smallScreenTableColumnDisplayIndex = {[2,3,4,5,6,12]} extraSmallScreenTableColumnDisplayIndex = {[2,5,11]}/>
                        {(this.state.logbookDialogPatientId ? <Logbook studentid={this.state.logbookDialogPatientId} studentName={this.state.studentName} dismiss={this.dismissDialog} /> : "")}
                        {(this.state.isDelete ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={BodyText} dismiss={this.backDashboard} />: "")}

                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
PatientList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AuthenticatedPage(["Provider"])(PatientList));
