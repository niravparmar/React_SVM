import React from 'react';
import Button from '@material-ui/core/Button';
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
class LogbookForAccountAdmin extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        console.log(this.props.patientid)
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handleLogbookClick = () => {
        this.setState({anchorEl:null});
        this.props.onLogBookClick(this.props.studentid, this.props.studentName);
    }

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Button
                    variant="outlined" color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleLogbookClick}
                    style={{ borderRadius: "50px"}}
            >
                Logbook
        </Button>
            </div>
        )
    }

}

export default withStyles(styles)(LogbookForAccountAdmin);