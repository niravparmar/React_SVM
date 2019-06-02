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
        right: theme.spacing.unit*.0001,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },

}))(props => {
    const { children, classes, onClose } = props;
    return (
        <DialogTitle disableTypography className={classes.root}>
            <Typography variant="subtitle2">{children}</Typography>
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
        scroll: 'body'
    };

    render() {
        return (
            <Dialog
                onClose={this.props.dismiss}
                scroll={this.state.scroll}
                open={true}
                aria-labelledby="customized-dialog-title"
                disableBackdropClick
                maxWidth='sm'
            >
                <CustomDialogTitle id="customized-dialog-title" onClose={this.props.dismiss}>
                {this.props.HeaderText}
                </CustomDialogTitle>
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