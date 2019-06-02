import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        transformOrigin: 'center bottom' ,

    },
    paper: {
        marginRight: theme.spacing.unit * 2,
        backgroundColor: "#fff"
        
    },
});
class ActionButtonForProvider extends React.Component {
    state = {
        anchorEl: null,
        open: false,
        scroll: 'body'
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleLogbookClick = () => {
        this.setState({anchorEl:null});
        this.props.onLogBookClick(this.props.studentid, this.props.studentName);
    }
    
    //Inactivate the Patient
    handleInactivatePatient = event => {
        this.setState({ anchorEl: null });
        this.props.inactivateFunction(this.props.studentid)
    };

    handleEditPrescription = () => {
        this.setState({ anchorEl: null });
        this.props.editPresctiption(this.props.studentid)
    } 
    handleCreateResult = () => {
        this.setState({ anchorEl: null });
        this.props.createResult(this.props.studentid)
    } 
    handleCreateAttendance = () =>{
        this.setState({ anchorEl: null });
        this.props.createAttendance(this.props.studentid)
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    
    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Button
                    variant="outlined" color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={{ borderRadius: "50px"}}
            >
                Action
        </Button>
                <Menu className={classes.root}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleLogbookClick}>Logbook</MenuItem>
                    <MenuItem onClick = {this.handleCreateResult}>Create Result</MenuItem>
                    <MenuItem onClick = {this.handleCreateAttendance}>Create Attendance</MenuItem>
                    <MenuItem onClick = {this.handleEditPrescription}>Edit Prescription</MenuItem>
                    <MenuItem onClick = {this.handleInactivatePatient}>Inactivate</MenuItem>
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(AuthenticatedPage(["Provider", "CoWorker","AccountAdmin"])(ActionButtonForProvider));