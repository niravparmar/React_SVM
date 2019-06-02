import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
 class TimeOutRenderer extends React.Component
{
    state = {isTimedOut: false}
    componentDidMount(){
        const timeoutCB = this.props.timeOutCallBack? this.props.timeOutCallBack: this.timeOutDone;
        this.props.userTimer(this.props.timeOutInMillis, timeoutCB);
    }

     timeOutDone = () => {
         this.setState({isTimedOut:true});
         localStorage.clear();
     };
     handleClick = () =>
     {
         this.props.history.push(`/public`);
     }
     componentWillUnmount() {
         this.props.userTimer.stopTimer();
     }


    render(){
           return ( 
               this.state.isTimedOut && 
                <Dialog
                    open={true}
                >
                    <DialogContent>
                        <DialogContentText>
                            <div>
                            Session has been expired due to inactivity, please login again to continue.
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClick} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
           );
    }
} 

TimeOutRenderer.propTypes = {
    timeOutInMillis: PropTypes.number,
    userTimer:PropTypes.func.isRequired,
    timeOutCallBack:PropTypes.func
}

TimeOutRenderer.defaultProps = {
    timeOutInMillis: 20*60*1000,
}


export default TimeOutRenderer;