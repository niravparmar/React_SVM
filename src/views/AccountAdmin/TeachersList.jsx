import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import ActionButtonEditTeacher from '../../components/ActionButtonForAccountAdmin';
import ActionButtomCoworker from '../../components/ActionButtonAdminExamHead';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Logbook from '../Logbook/Logbook';
import Select from 'mui-select-with-search-vivek';
import FormControl from '@material-ui/core/FormControl';
import { WithAccount } from '../AccountContext';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import StudentsList from './StudentsList';
import AssignClass from './AssignClass';

const styles = theme => ({
    root: {
        // padding : "1",
        marginTop: theme.spacing.unit * 3,
        ...theme.mixins.gutters(),
        // paddingTop: theme.spacing.unit * 1,
        // paddingBottom: theme.spacing.unit * 1,
        padding : "4px 15px"
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
        marginRight: 20,
        display: "block",
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
    },
    selectItemWrapper:{
        display:'inline-Flex',
        alignItems:'center',
        margin:"10px"
    }
});

class AccountPatientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountid: null,
            teachers: [],
            providerid: null,
            patients: [],
            logbookDialogPatientId: null,
            patientName: '',
            anchorEl: null,
            studentListId: null,
            assignClass: null
        };
    }
    tableheads1 = [
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
            name: "emailid",
            label: "Email ID",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "cellnumber",
            label: "Cell Number",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "gender",
            label: "Gender",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
         {
            name: "userrole",
            label: "User Role",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "class",
            label: "Class Teacher",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "qualification",
            label: "Qualification",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "subject",
            label: "Specilist",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        
        {
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                print : false,
                customBodyRender: (value) => {
                    if(value.userrole == 3){return ( <ActionButtonEditTeacher teacherid={value.userid} onEditTeacher ={this.onEditTeacher} onShowStudents = {this.onShowStudents} onAssignClass={this.onAssignClass } />  )}
                    else if(value.userrole == 4){ return ( <ActionButtomCoworker teacherid={value.userid} onEditTeacher ={this.onEditTeacher} onShowStudents = {this.onShowStudents} onAssignClass={this.onAssignClass } /> )}
                }
            }
        },

    ];
     //Edit Teachers
     onEditTeacher = (teacherid) => {
        this.props.history.push('./edit-account/'+teacherid);
    }
    //Show Students List
    onShowStudents = (teacherid) => {
        this.props.history.push('./studentslist/'+teacherid);
        // this.setState({studentListId: teacherid})
    }
    //Assign class
    onAssignClass = (teacherid) => {
        this.setState({assignClass:teacherid})
    }
    async componentDidMount() {
        let accountid = this.props.currentAccountId;
        if (accountid && accountid.length > 0) {
            let url = '/api/account/' + accountid + '/providers';
            let response = await this.props.authenticatedApiCall('get', url, null)
            if (response.data.length > 0) {
              response.data.map((item) => {
                    item.action = { userid : item.userid, userrole:item.userrole }
                    item.name = item.firstname +" "+ item.lastname

                    if(item.qualification === 1){item.qualification = 'B.Sc'}
                    else if(item.qualification === 2){item.qualification = 'M.Sc'}
                    else if(item.qualification === 3){item.qualification = 'B.Tech'}
                    else if(item.qualification === 4){item.qualification = 'BA'}

                    if(item.subject === 1){item.subject = 'Science'}
                    else if(item.subject === 2){item.subject = 'Math'}
                    else if(item.subject === 3){item.subject ="English"}
                    else if(item.subject === 4){item.subject = 'Hindi'}
                    else if(item.subject === 5){item.subject = 'History'}

                    if(item.class === 1){item.class = '6th'}
                    else if(item.class === 2){item.class = '7th'}
                    else if(item.class === 3){item.class = '8th'}
                    else if(item.class === 4){item.class = '9th'}
                    else if(item.class === 5){item.class = '10th'}
                    else if(item.class === 6){item.class = '11th'}
                    else if(item.class === 7){item.class = '12th'}
    
                    if(item.section === '1'){item.section = 'A'}
                    else if(item.section === '2'){item.section = 'B'}
                    else if(item.section === '3'){item.section = 'C'}
                    else if(item.section === '4'){item.section = 'D'}
                    else if(item.section === '5'){item.section = 'E'}

                    if(item.userrole === 3){item.userrole = 'Teacher'}
                    else if(item.userrole === 4){item.userrole = 'Exam Head'}

                    item.class = item.class +" "+ item.section
                });

                this.setState({
                    teachers:response.data
                })
            }
        }
    };
   
    dismissDialog = () =>{
        this.setState({ assignClass: null });
    } 

    render() {
        const { classes } = this.props;
        // var CustomAlgo = <NavLink to={{ pathname: `/admin/algo` }} style={{ textDecorationLine: "none" }}>Custom Algorithm</NavLink>

        return (
            <div className={classes.root}>
                
                <MuiThemeDataTable title ={'Teachers List'} rows={this.state.teachers} columns={this.tableheads1} />
                 {(this.state.assignClass ? <AssignClass teacherid = {this.state.assignClass} dismiss={this.dismissDialog}/>: "")}
                {/* {(this.state.logbookDialogPatientId ? <Logbook patientId={this.state.logbookDialogPatientId} patientName={this.state.patientName} dismiss={this.dismissDialog} /> : "")} */}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("AccountAdmin")(WithAccount(AccountPatientList)));

