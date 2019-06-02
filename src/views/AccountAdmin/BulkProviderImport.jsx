import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { withStyles } from '@material-ui/core/styles';

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
    }
});

class BulkImport extends React.Component {
    state = {
        accounts: [],
        accountid: null,
        providers: [],
        providerid: null,
        patients: []
    };

    render() {
    
        return (
            <div>
                <h1>Bulk Import Page</h1>
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage("AccountAdmin")(BulkImport));