
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import { Typography } from '@material-ui/core';
class ExamCompleted extends React.Component {
    state = {
        result : 0,
    }
    async componentDidMount () {
        console.log("come")
        var r = (this.props.rightAnswer*100)/this.props.totalQuestion.length
        this.setState({result: r })

        const token = this.props.currentUser.userDetails.accesstoken
        let response = await this.props.authenticatedApiCall('post', '/api/userservice/createentranceresult', {
            token:token,
            totalmarks: this.props.totalQuestion.length,
            obtainedmarks: this.props.rightAnswer,
        });
    }
    render() {
        return (
            <div>
                <Typography>You have been completed your entrance examination successfully.</Typography><hr></hr>
                <Typography>{"Student Name : "+ this.props.loggedInUserObj.userDetails.studentname }</Typography>
                <Typography>{"Your correct answers are : "+ this.props.rightAnswer +" out of "+ this.props.totalQuestion.length}</Typography>
                <Typography>{"Your percentages is : "+ this.state.result}</Typography>
                <Typography>Final Result : {(this.state.result > 60? "Passed": "Failed")}</Typography>
            </div>
        );

    }

}
export default AuthenticatedPage([2])(ExamCompleted);