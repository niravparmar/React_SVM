import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import LogbookTab from './LogbookTab';

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
    Modal1:
    {
        maxWidth: "1000px"
    }
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

class Logbook extends React.Component {
    state = {
        scroll: 'body',
        selecteddays: '',
        bgdata: [],
        patientId: '',
    };

    render() {
        return (
                <Dialog
                    onClose={this.props.dismiss}
                    scroll={this.state.scroll}
                    open={true}
                    aria-labelledby="customized-dialog-title"
                    maxWidth='md'
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.dismiss}>
                    {this.props.studentName}
                    </DialogTitle>
                    <DialogContent>
                            <LogbookTab studentid={this.props.studentid} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.dismiss} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}

export default Logbook;
