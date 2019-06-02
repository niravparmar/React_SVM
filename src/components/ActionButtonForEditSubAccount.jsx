import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

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
    BtnFnt: {
        fontSize:"12px",
        borderRadius:"50px",
        width:"100%"
    }
});
class ActionButtonForAccountAdmin extends React.Component {
    state = {
        anchorEl: null,
    };
    
    // handleClick = event => {
    //     console.log(this.props)
    //     // this.dismissBox();
    //     // this.setState({ anchorEl: event.currentTarget });
    // };

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
                    className={classes.BtnFnt}
            >
                {/* Edit Account */}
                    <Link to={{pathname:`/superadmin/editsubaccount/`+this.props.accountid}}  style={{ textDecorationLine: "none" }} >Edit</Link>
            </Button>
                
            </div>
        )
    }

}

export default withStyles(styles)(ActionButtonForAccountAdmin);