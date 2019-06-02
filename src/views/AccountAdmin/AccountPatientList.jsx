import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from '../../components/LogbookForAccountAdmin';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Logbook from '../Logbook/Logbook';
import Select from 'mui-select-with-search-vivek';
import FormControl from '@material-ui/core/FormControl';
import { WithAccount } from '../AccountContext';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';

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
            providers: [],
            providerid: null,
            patients: [],
            logbookDialogPatientId: null,
            patientName: '',
            anchorEl: null,
        };
    }
    tableheads1 = [
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
                filterOptions: ['Active', 'Pending', 'Hypo','Hyper'],
                customBodyRender : (value) =>{
                    if (value === 'Pending') { return <span style={{ color: "#FFD700" }}>Pending</span> }
                    else if(value === 'MaxDose'){return <span style={{backgroundColor:"#FF4500",color:"#fff",padding:"4px 8px",borderRadius:"25px",fontSize:"11px"}}>MaxDose</span>}
                    else if (value === 'Active') { return  <span style={{ color: "#00b33c" }}>Active</span> }
                    else if (value === 'Hypo') { return  <span style={{backgroundColor:"#96100c",color:"#fff",padding:"4px 8px",borderRadius:"25px",fontSize:"11px"}}>Hypo</span> }
                    else if (value === 'Hyper') { return <span style={{ color: "#b30000" }}>Hyper</span> }
                }
            }
        },
        {
            name: "name",
            label: "Patient",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender : (value)=>{
                    return <p style={{ width: "100px" }}><b>{value}</b></p>
                }
            }
        },

        {
            name: "bgvalue",
            label: "Last FBG(mg/dL)",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "currentdose",
            label: "Current Dose (units)",
            options: {
                filter: false,
                sort: true,
                searchable: false
            }
        },
        {
            name: "startingdose",
            label: "Initial Dose (units)",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "medicationname",
            label: "Insulin",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "protocolname",
            label: "Algorithm",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "entrydate",
            label: "Last Entry",
            options: {
                filter: false,
                sort: true,
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
                        <ActionButton patientid={value.patientid} patientName={value.patientName} onLogBookClick={this.onLogBookClick} inactivateFunction={this.inactivatePatient} />
                    )
                }
            }
        },

    ];
    onLogBookClick = (patientId, patientName) => {
        this.setState({ logbookDialogPatientId: patientId, patientName: patientName });
    }


    async componentDidMount() {
        let accountid = this.props.currentAccountId;
        console.log(accountid)
        if (accountid && accountid.length > 0) {
            let url = '/api/account/' + accountid + '/providers';
            let response = await this.props.authenticatedApiCall('get', url, null)
            if (response.data.length > 0) {
                let labelsArray = response.data.map((item) => {
                    return { value: item.userid, label: item.lastname + item.firstname }
                });
                this.setState({
                    providers: labelsArray,
                })
            }
        }
    };
    //entrydate
    timeSince = (date) => {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years Ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }

    handleProviderChange = async selectedValue => {
        var accountid = this.props.currentAccountId;
        this.setState({
            providerid: selectedValue.value,
            patients: []
        })
        let url = "/api/account/" + accountid + "/" + selectedValue.value + "/patients";
        let response = await this.props.authenticatedApiCall('get', url, null)
        // console.log(response)
        if (response.data.length > 0) {
            response.data.forEach((item) => {
                item.Action = {
                    patientid : item.patientid,
                    patientName: item.firstname + " " + item.lastname
                }
                             
                item.name = item.lastname + " " + item.firstname;
                if (item.status === '1') { item.status = 'Pending' }
                else if(item.status === '2'&& item.currentdose >=item.maxunitperday){item.status = 'MaxDose'}
                else if (item.status === '2') { item.status = 'Active' }
                else if (item.status === '4') { item.status = 'Hypo' }
                else if (item.status === '5') { item.status ='Hyper' }
                if(item.entrydate!=null){
                item.entrydate = this.timeSince(item.entrydate);
                }
            });
            this.setState({
                patients: response.data
            })
            // console.log(this.state.patients)
            if (this.state.patients !== null) {
                return
            }
        }
    };

    dismissDialog = () => this.setState({ logbookDialogPatientId: null });

    render() {
        const { classes } = this.props;
        // var CustomAlgo = <NavLink to={{ pathname: `/admin/algo` }} style={{ textDecorationLine: "none" }}>Custom Algorithm</NavLink>

        return (
            <div className={classes.root}>
                {/* <Button className={classes.button}>{CustomAlgo}</Button> */}
                <Paper  elevation={1}>
                <div className = {this.props.classes.selectItemWrapper}>
                <InputLabel>Provider</InputLabel>

                        <FormControl
                            style={{ width: 350 }}
                        >

                            <Select
                                value={this.state.providerid}
                                onChange={this.handleProviderChange}
                                options={this.state.providers}
                                placeholder='Select a Provider'
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            >
                            </Select>
                        </FormControl>
                    </div>
                </Paper>
                {/* <DynamicTable rows={this.state.patients} tableheads={tableheads} keyNames={keyNames} buttonTitle="Action" /> */}
                <MuiThemeDataTable title={'Patients Activity'} rows={this.state.patients} columns={this.tableheads1} />
                {(this.state.logbookDialogPatientId ? <Logbook patientId={this.state.logbookDialogPatientId} patientName={this.state.patientName} dismiss={this.dismissDialog} /> : "")}
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage(["AccountAdmin", "DefaultAccountAdmin"])(WithAccount(AccountPatientList)));

