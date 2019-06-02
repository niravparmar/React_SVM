import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";
import ActionButton from '../../components/ActionButtonForEditSubAccount';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CreateAccount from './CreateAccount';
const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },

}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
// let counter = 0;
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
});
class CreateSubAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            open: true,
            scroll: 'body',
            accounts: []
        };

    }
    handleClickOpen = scroll => () => {
        this.setState({ open: true, scroll });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    getButtonFunction = (prop1) => () => {
        return <ActionButton accountid={prop1} dismissBox={this.props.dismiss} />;
    }
    async componentDidMount() {
        var accountid = this.props.accountid;
      console.log(accountid)
        let response = await this.props.authenticatedApiCall('get', '/api/account/' + accountid + '/withdetails', null);
        console.log(response)
        if (response.data.length > 0) {
            response.data.forEach((item) => {
            item.Action = this.getButtonFunction(item.accountid)
                item.name = item.lastname + " " + item.firstname;
                item.accountname = <b>{item.accountname}</b>
                
            });
            this.setState({
                accounts: response.data,
                name: response.data[0].accountname,
            })

            this.setState({
                rows: response.data
            })
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    scroll={this.state.scroll}
                    open={true}
                    aria-labelledby="customized-dialog-title"
                    maxWidth='lg'
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.dismiss}>
                        <div>
                            <Typography variant="h6">Create Sub Account for {this.state.name} </Typography>
                        </div>
                    </DialogTitle>
                    {/* <LogbookTab /> */}
                    <DialogContent>
                        <DialogContentText>
                            <div>
                                <CreateAccount parentAccountId={this.props.accountid}/>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.dismiss} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

CreateSubAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthenticatedPage("SuperAdmin")(CreateSubAccount));