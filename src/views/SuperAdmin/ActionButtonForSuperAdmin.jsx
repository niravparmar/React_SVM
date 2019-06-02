import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

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
class ActionButtonForSuperAdmin extends React.Component {
    state = {
        anchorEl: null,
        accountid:''
    };

    handleClick = event => {
        this.setState({accountid:this.props.accountid})
        this.setState({ anchorEl: event.currentTarget });
    };
    handleUnlockAccountClick = () => {
        this.setState({anchorEl:null});
        this.props.handleUnlockAccount(this.props.accountid);
    }
    handleLockAccountClick = () => {
        this.setState({anchorEl:null});
        this.props.handleLockAccount(this.props.accountid);
    }
    handleEditAccountClick = () =>{
        this.setState({ anchorEl: null });
        this.props.handleEditAccountClick(this.props.accountid); 
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
                    <MenuItem onClick={this.handleEditAccountClick} >Edit Account</MenuItem>
                    {(this.props.status == 1 ? <MenuItem onClick={this.handleLockAccountClick}>Lock Account</MenuItem>:"" )}
                    {(this.props.status == 2 ? <MenuItem onClick={this.handleUnlockAccountClick} >Unlock Account</MenuItem>: "" )}
                    
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForSuperAdmin);