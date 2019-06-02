import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import Select from 'mui-select-with-search-vivek';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from '../../components/LogbookForSuperAdmin';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import { lazyWithPreload } from '../../components/LazyLoader';

const Logbook = lazyWithPreload(() =>{
    return import('../Logbook/Logbook');
})
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
    selectItemWrapper:{
        display:'inline-Flex',
        alignItems:'center',
        margin:"10px"
    }
});

class PatientList extends React.Component {
    state = {
        accounts: [],
        accountid: null,
        providers: [],
        providerid: null,
        students: [],
        logbookDialogPatientId:null,
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
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                print : false,
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
    async componentDidMount() {
        setTimeout(function(){
            Logbook.preload();
        }, 2000)
        let response = await this.props.authenticatedApiCall('get', '/api/account/all', null)
        if (response.data.length > 0) {
            let labelsArray =  response.data.map((item) => {
                return {value:item.accountid,label:item.accountname}
            });
            this.setState({
                accounts: labelsArray
            })
        }
    }

    handleAccountChange = async selectedValue => {
        this.setState({
            accountid: selectedValue,
            providers: [],
            providerid: null
        })
        let url = '/api/account/' + selectedValue.value + '/providers/all';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.length > 0) {
            let labelsArray =  response.data.map((item) => {
                return {value:item.userid,label:item.lastname + item.firstname}
            });
            this.setState({
                providers: labelsArray,
            })
        }
    };

    handleProviderChange = async selectedValue => {
        console.log(selectedValue)
        this.setState({
            providerid: selectedValue,
            students: []
        })
        let url = "/api/account/" + this.state.accountid.value + "/" + selectedValue.value + "/students";
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.length > 0) {
            response.data.forEach((item) => {
                item.name = item.lastname + " " + item.firstname;

                item.Action = {studentid : item.studentid, studentName:  item.name }
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
            if (this.state.patients !== null) {
                return
            }
        }
    };
    dismissDialog = () => this.setState({logbookDialogPatientId:null});

    render() {
        const classes = this.props;
        return (
            
            <div>
                <Paper className={classes.root} elevation={1}>
                <div className = {this.props.classes.selectItemWrapper}>
                <InputLabel>Accounts</InputLabel>

                <FormControl
          style={{ width: 350 }}
        >
                <Select
                    value={this.state.accountid}
                    onChange={this.handleAccountChange}
                    options={this.state.accounts}
                    placeholder='Select an Account'
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                >
                   
                </Select>
                </FormControl>
                </div>

                <div className = {this.props.classes.selectItemWrapper}>
                <InputLabel>Teachers</InputLabel>

                <FormControl
                style={{ width: 350 }}
                    >
                <Select
                    value={this.state.providerid}
                    onChange={this.handleProviderChange}
                    options={this.state.providers}
                    placeholder='Select a Teacher'
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                >
                </Select>
                </FormControl>
                </div>
                </Paper>
                <MuiThemeDataTable title ={'Students List'} rows={this.state.students} columns={this.tableheads1} />
                {(this.state.logbookDialogPatientId ? <Logbook studentid={this.state.logbookDialogPatientId} studentName={this.state.studentName} dismiss={this.dismissDialog} /> : "")}
            </div>
        );
    }
}

PatientList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(PatientList));
    // export default withStyles(styles)(PatientList);
