import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AuthenticatedPage from "../AuthenticatedStudent";
import _ from 'lodash';
import { withStyles } from '@material-ui/core';

const subjectOptions = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Maths' }, { value: 4, label: 'Science' }, { value: 5, label: 'History' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }]
const styles = {
    tableHeading:{
        border: '1px solid #000',
        height: '30px',
        textAlign: 'center'
    }
}


class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            scroll: 'body',
            selecteddays: 7,
            bgdata: [],
            resultdata: [],
            dosedata: [],
            fullData: [],
            subjects: [],
            obtainedMarks: [],
            totalMarks: [],
            TTLM: '',
            OBTM: ''
        };


    }


    handleClickOpen = scroll => () => {
        this.setState({ open: true, scroll });
    };
    handleClose = () => {
        this.setState({ open: false });
    };


    async componentDidMount() {
        var studentid = this.props.studentid;
        const token = this.props.currentUser.userDetails.accesstoken
        console.log(studentid)
        var subjectResponse = await this.props.authenticatedApiCall('post', '/api/userservice/'+studentid+'/assignsubjects', {token:token});
        var sub =[];
        console.log(subjectResponse.data)
        if(subjectResponse.data.length > 0) {
            subjectResponse.data.map((item) => {
                subjectOptions.forEach(subject => {
                    if (item.subjects == subject.value) {
                        item.subjects = subject.label
                    } 
                })
                sub.push(item.subjects)
            })
            this.setState({subjects: sub})
        }
        var response = await this.props.authenticatedApiCall('post', '/api/userservice/'+ studentid+'/getresult', {token:token});
        console.log(response.data)   
        if(response.data){
            let result = JSON.stringify(response.data);
            var res = JSON.parse(result)
            let TM =[]
            TM.push(res.hindi)
            TM.push(res.english)
            TM.push(res.math)
            TM.push(res.science)
            TM.push(res.history)
            TM.push(res.physics)
            let OM = []
            OM.push(res.hindiobtainmarks)
            OM.push(res.englishobtainmarks)
            OM.push(res.mathobtainmarks)
            OM.push(res.scienceobtainmarks)
            OM.push(res.historyobtainmarks)
            OM.push(res.physcisobtainmarks)
            var Total = parseInt(res.hindiobtainmarks) + parseInt(res.englishobtainmarks) + parseInt(res.mathobtainmarks) + parseInt(res.scienceobtainmarks) + parseInt(res.historyobtainmarks) + parseInt(res.physcisobtainmarks) 
            var t =  res.hindi + res.english +  res.math + res.science + res.history + res.physics
            this.setState({totalMarks:TM, obtainedMarks: OM, OBTM:Total, TTM: t })
           }

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Table>
                    {/* {(new Date)} */}
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeading} key='subjects'>Subject</TableCell>
                            <TableCell className={classes.tableHeading} key='tm'>Total Marks</TableCell>
                            <TableCell className={classes.tableHeading} key='om'>Obtained Marks</TableCell>
                            <TableCell className={classes.tableHeading} key='per'>Subject Percenatges</TableCell>
                            <TableCell className={classes.tableHeading} key='grade'>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {this.state.subjects.map((subjects, i)=>
                        <TableRow><TableCell key={i}>{subjects}</TableCell></TableRow>)} */}
                        
                        {this.state.subjects.map((subjects, i)=>
                        <TableRow key={i}>
                                <TableCell className={classes.tableHeading} key='a'><b>{subjects}</b></TableCell>
                                <TableCell className={classes.tableHeading} key='b'>{this.state.totalMarks[i]}</TableCell>
                                <TableCell className={classes.tableHeading} key='c'>{this.state.obtainedMarks[i]}</TableCell>
                                <TableCell className={classes.tableHeading} key='d'>{((this.state.obtainedMarks[i]*100)/this.state.totalMarks[i])} {'%'}</TableCell>
                                <TableCell className={classes.tableHeading} key='e'>{((this.state.obtainedMarks[i]*100)/this.state.totalMarks[i])>90?'A':((this.state.obtainedMarks[i]*100)/this.state.totalMarks[i])>70?'B':((this.state.obtainedMarks[i]*100)/this.state.totalMarks[i])>50?'C':'D'}</TableCell>
                        </TableRow>)}
                        <TableRow>
                                <TableCell className={classes.tableHeading} key='a'><b>{'Total Marks'}</b></TableCell>
                                <TableCell className={classes.tableHeading} key='b'>{this.state.TTM}</TableCell>
                                <TableCell className={classes.tableHeading} key='c'>{this.state.OBTM}</TableCell>
                                <TableCell className={classes.tableHeading} key='d'>{Math.round((this.state.OBTM*100)/this.state.TTM)} {'%'}</TableCell>
                                <TableCell className={classes.tableHeading} key='e'>{((this.state.OBTM*100)/this.state.TTM)>33?'Passed':'Fail'}</TableCell>
                        </TableRow>   
                        {/* {this.state.subjects.map((subjects, i)=>
                        <TableCell key='a'>{subjects}</TableCell>
                        </TableRow>)} */}
                        
                            {/* <TableCell>Hindi</TableCell><TableCell>{this.state.resultdata.hindi}</TableCell><TableCell>{this.state.resultdata.hindiobtainmarks}</TableCell><TableCell>A1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>English</TableCell><TableCell>{this.state.resultdata.english}</TableCell><TableCell>{this.state.resultdata.englishobtainmarks}</TableCell><TableCell>A1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Math</TableCell><TableCell>{this.state.resultdata.math}</TableCell><TableCell>{this.state.resultdata.mathobtainmarks}</TableCell><TableCell>A1</TableCell>
                        </TableRow>
                        <TableRow>   
                            <TableCell>Science</TableCell><TableCell>{this.state.resultdata.science}</TableCell><TableCell>{this.state.resultdata.scienceobtainmarks}</TableCell><TableCell>A1</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell>History</TableCell><TableCell>{this.state.resultdata.history}</TableCell><TableCell>{this.state.resultdata.historyobtainmarks}</TableCell><TableCell>A1</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell>Physics</TableCell><TableCell>{this.state.resultdata.physics}</TableCell><TableCell>{this.state.resultdata.physcisobtainmarks}</TableCell><TableCell>A1</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell>Hindi</TableCell><TableCell>{this.state.resultdata.hindi}</TableCell><TableCell>{this.state.resultdata.hindiobtainmarks}</TableCell><TableCell>A1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Marks</TableCell><TableCell>{this.state.resultdata.hindi+this.state.resultdata.physics+this.state.resultdata.history}</TableCell><TableCell>{parseInt(this.state.resultdata.hindiobtainmarks)+parseInt(this.state.resultdata.physcisobtainmarks)+parseInt(this.state.resultdata.historyobtainmarks)}</TableCell><TableCell>Pass</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage([1])(Result));
