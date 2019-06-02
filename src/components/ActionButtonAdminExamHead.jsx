import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        transformOrigin: 'center bottom',

    },
    paper: {
        marginRight: theme.spacing.unit * 2,
        backgroundColor: "#fff"

    },
});
class ActionButtonForAccountAdmin extends React.Component {
    state = {
        anchorEl: null,
        providerid: ''
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    //handle student List
    handleStudentList = () =>{
        this.setState({ anchorEl: null });
        this.props.onShowStudents(this.props.teacherid);
    }

    //handle class
     handleAssignClass = () =>{
         this.props.onAssignClass(this.props.teacherid)
     }
    //handle edit provider
    handleEditTeacher = () => {
        this.setState({ anchorEl: null });
        this.props.onEditTeacher(this.props.teacherid);
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
                    style={{ borderRadius: "50px" }}
                >
                    Action
        </Button>
                <Menu className={classes.root}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleStudentList}>Selected Students</MenuItem>
                    <MenuItem onClick={this.handleEditTeacher}>Edit</MenuItem>
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForAccountAdmin);