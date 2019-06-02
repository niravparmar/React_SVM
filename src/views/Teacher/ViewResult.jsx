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

class ResultList extends React.Component {
    state = {
        students: [],
        logbookDialogPatientId: null,
        patientName: '',
        anchorEl: null,
        Results: []
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
            name: "hindi",
            label: "Hindi",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "hindiobtainmarks",
            label: "HOM",
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
            name: "english",
            label: "English",
            options: {
                filter: true,
                sort: true,
                searchable: false
            }
        },
        {
            name: "englishobtainmarks",
            label: "EOM",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "math",
            label: "Math",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "mathobtainmarks",
            label: "MOM",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "science",
            label: "Science",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "scienceobtainmarks",
            label: "SOM",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "history",
            label: "History",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "historyobtainmarks",
            label: "HOM",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        } ,
        {
            name: "physics",
            label: "Physics",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "physcisobtainmarks",
            label: "POM",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        }
    ];


    async componentDidMount() {
        let response = await this.props.authenticatedApiCall('get', '/api/ProviderService/getstudentsresult', null);
        if (response.data.length > 0) {
            this.setState({
                Results: response.data
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
                        <MuiThemeDataTable title ={'Students Result'} rows={this.state.Results} columns={this.tableheads1} />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
ResultList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AuthenticatedPage(["Provider"])(ResultList));
    // export default withStyles(styles)(PatientList);
