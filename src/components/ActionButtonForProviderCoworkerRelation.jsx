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
        coworkerid: ''
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    //handle edit coworker
    handleEditCoWorkerClick = () => {
        this.setState({ anchorEl: null });
        this.props.onEditCoWorkerAccount(this.props.coworkerid);
    }

    //handle provider coworker relation
    handleProviderCoworkerRealtion =() => {
        this.props.onEditProviderCoworkerRelation(this.props.coworkerid);
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
                    <MenuItem onClick={this.handleEditCoWorkerClick}>Edit Account</MenuItem>
                    <MenuItem onClick={this.handleProviderCoworkerRealtion}>Provider-CoWorker Relationship</MenuItem>
                </Menu>
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForAccountAdmin);