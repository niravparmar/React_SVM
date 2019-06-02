import React from 'react';
import Divider from '@material-ui/core/Divider';
import { Dialog, DialogActions, DialogContent, Typography, DialogTitle, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const CustomDialogTitle = withStyles(theme => ({
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
        <DialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});

class SuccessDialog extends React.Component {
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
                disableBackdropClick
                aria-labelledby="customized-dialog-title"
                maxWidth='sm'
            >
                <CustomDialogTitle id="customized-dialog-title" onClose={this.props.dismiss}>
                {this.props.HeaderText}
                </CustomDialogTitle>
                <DialogContent>
                  <br/>
               {this.props.BodyText}
                </DialogContent>
                <Divider/>
                <DialogActions>
                {this.props.successButton.map((button,i)=>
                  <div key={i}><div>{button}</div></div>
                    )}  
                </DialogActions>
            </Dialog>
        );
    }
}

export default SuccessDialog;