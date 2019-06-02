import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles } from '@material-ui/core/styles';
import ActionButton from './ActionButtonForExamhead';
import PropTypes from 'prop-types';
import Logbook from '../Logbook/Logbook';
import Select from 'mui-select-with-search-vivek';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import Paper from '@material-ui/core/Paper';
 
const classOptions = [{ value:1, label:"6th"},{value:2, label:"7th"}, {value:3, label:"8th"}, {value:4, label:"9th"}, {value:5, label:"10th"}, {value:6, label:"11th"}, {value:7, label:"12th"}];

const styles = theme => ({
    root: {
        // padding : "1",
        marginTop: theme.spacing.unit * 0.5,
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
    selectItemWrapper: {
        display: 'inline-Flex',
        alignItems: 'center',
        margin: "10px"
    }
});

class PatientList extends React.Component {
    state = {
        students: [],
        class: ''
    };

    tableheads1 = [
        {
            name: "studentid",
            label: "SR. No",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },

        {
            name: "cellnumber",
            label: "Cell Number",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "dob",
            label: "DOB",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "totalmarks",
            label: "Total Marks",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "obtainedmarks",
            label: "Obtained Marks",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                print: false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton studentid={value.studentid}  pramoteStudent={this.onPramoteStudent} deleteStudent={this.onDeleteStudent} />
                    )
                }
            }
        },

    ];
    onPramoteStudent = async (studentid) => {
        console.log(this.state.class)
        let url = "/api/ProviderService/" + studentid +"/"+ this.state.class+"/pramotestudent";
        let response = await this.props.authenticatedApiCall('put', url, null)
        if(response){
            alert("Student Pramoted Successfully")
        }else{
            alert("Unable To Delete");
        }
    }
    onDeleteStudent = async (studentid) =>{
        let url = "/api/ProviderService/" + studentid + "/deletestudent";
        let response = await this.props.authenticatedApiCall('delete', url, null)
        if(response){
            alert("Student Deleted Successfully")
        }else{
            alert("Unable To Delete");
        }
    }

    handleClassChange = async selectedValue => {
        let url = '/api/ProviderService/'+selectedValue.value+'/entrancestudents';
        let response = await this.props.authenticatedApiCall('get', url, null)
        console.log(response.data)
        if (response.data.length > 0) {
            response.data.forEach((item) => {
                item.name = item.firstname + " " + item.lastname;
                item.Action = {
                    studentid : item.studentid, studentName:  item.name
                }
            });
            // console.log(response.data)
            this.setState({
                students: response.data, class: selectedValue.value
            })
        }
    };
    

    render() {
        const {classes} = this.props;
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem md={12}>
                        <Paper className={classes.root} elevation={1}>
                            <div className={this.props.classes.selectItemWrapper}>
                                <InputLabel>Class</InputLabel>

                                <FormControl
                                    style={{ width: 350 }}
                                >
                                    <Select
                                        value={this.state.class}
                                        onChange={this.handleClassChange}
                                        options={classOptions}
                                        placeholder='Select Class'
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    >

                                    </Select>
                                </FormControl>
                            </div>
                        </Paper>
                        <MuiThemeDataTable title={'Student List'} rows={this.state.students} columns={this.tableheads1} />
                    </GridItem>
                </GridContainer>
            </div>

        );
    }
}
PatientList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AuthenticatedPage(["CoWorker"])(PatientList));
