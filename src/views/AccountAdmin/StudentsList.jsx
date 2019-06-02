import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ActionButton from '../../components/ActionAdminLogbook';
import PropTypes from 'prop-types';
import Logbook from '../Logbook/Logbook';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import { WithAccount } from '../AccountContext';

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

class StudentsList extends React.Component {
    state = {
        students: [],
        logbookDialogPatientId: null,
        studentName: '',
        anchorEl: null,
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
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton studentid={value.studentid} studentName={value.studentName}  onLogBookClick={this.onLogBookClick} />
                    )
                }
            }
        }
    ];
    onLogBookClick = (studentid, name) => {
        this.setState({ logbookDialogPatientId: studentid, studentName:name});
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
  
    async componentDidMount() {
        let providerid = this.props.teacherid;
        let accountid = this.props.currentAccountId;
        let response = await this.props.authenticatedApiCall('get', '/api/account/'+ accountid +"/"+ providerid + '/students', null);
        if (response.data.length > 0) {
            response.data.forEach((item) => { 
                item.name = item.firstname + " " + item.lastname;
                item.action = {
                    studentid : item.studentid,studentName:  item.name
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

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <GridContainer justify="center">
                    <GridItem md={12}>                        
                        <br></br>
                        <MuiThemeDataTable title ={'Students List'} rows={this.state.students}  columns={this.tableheads1} />
                        {(this.state.logbookDialogPatientId ? <Logbook studentid={this.state.logbookDialogPatientId} studentName={this.state.studentName} dismiss={this.dismissDialog} /> : "")}
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("AccountAdmin")(WithAccount(StudentsList)));

// export default withStyles(styles)(AuthenticatedPage("AccountAdmin")(WithAccount((StudentsList))));    
