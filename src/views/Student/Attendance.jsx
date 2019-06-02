import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AuthenticatedPage from  "../AuthenticatedStudent";
import _ from 'lodash';
import { withStyles } from '@material-ui/core';

const monthOptions = [{ value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' }, { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' }, { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' }, { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }]
const styles = {
    tableHeading:{
        border: '1px solid #000',
        height: '30px',
        textAlign: 'center'
    }
}
class Attendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            scroll: 'body',
            totalDays : [],
            presentDays: [],
            monthName: [],
            TWD: '',
            TPD: ''
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
        var response = await this.props.authenticatedApiCall('post', '/api/userservice/'+studentid+'/studentattendance', {token:token});
        const r = response.data;
        var MonthsName = []
        monthOptions.map(month=>{
            MonthsName.push(month.label)
        })
        
        var TotalDays = []
        TotalDays.push(r.jtd) 
        TotalDays.push(r.ftd)
        TotalDays.push(r.mtd)
        TotalDays.push(r.atd)
        TotalDays.push(r.matd)
        TotalDays.push(r.juntd)
        TotalDays.push(r.jultd)
        TotalDays.push(r.autd)
        TotalDays.push(r.std)
        TotalDays.push(r.otd)
        TotalDays.push(r.ntd)
        TotalDays.push(r.dtd)
        
        var PresentDays = []
        PresentDays.push(r.jpd)
        PresentDays.push(r.fpd)
        PresentDays.push(r.mpd)
        PresentDays.push(r.apd)
        PresentDays.push(r.mapd)
        PresentDays.push(r.junpd)
        PresentDays.push(r.julpd)
        PresentDays.push(r.aupd)
        PresentDays.push(r.spd)
        PresentDays.push(r.opd)
        PresentDays.push(r.npd)
        PresentDays.push(r.dpd)

        var sumTD = 0;
        TotalDays.map((td, i)=>{
            sumTD = sumTD + td
        })
        var sumPD = 0;
        PresentDays.map((pd, i)=>{
            sumPD = sumPD + pd
        })
        this.setState({ totalDays:TotalDays, presentDays: PresentDays, monthName:MonthsName, TWD: sumTD, TPD:sumPD })
        // var response = await this.props.authenticatedApiCall('get', '/api/providerservice/'+ studentid+Attendance' , null);
        //    if(response.data){
        //     let result = JSON.stringify(response.data);
        //     var res = JSON.parse(result)
        //     let TM =[]
        //     TM.push(res.hindi)
        //     TM.push(res.english)
        //     TM.push(res.math)
        //     TM.push(res.science)
        //     TM.push(res.history)
        //     TM.push(res.physics)
        //     let OM = []
        //     OM.push(res.hindiobtainmarks)
        //     OM.push(res.englishobtainmarks)
        //     OM.push(res.mathobtainmarks)
        //     OM.push(res.scienceobtainmarks)
        //     OM.push(res.historyobtainmarks)
        //     OM.push(res.physcisobtainmarks)
        //     var Total = parseInt(res.hindiobtainmarks) + parseInt(res.englishobtainmarks) + parseInt(res.mathobtainmarks) + parseInt(res.scienceobtainmarks) + parseInt(res.historyobtainmarks) + parseInt(res.physcisobtainmarks) 
        //     var t =  res.hindi + res.english +  res.math + res.science + res.history + res.physics
        //     this.setState({totalMarks:TM, obtainedMarks: OM, OBTM:Total, TTM: t })
        //    }

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Table>
                    {/* {(new Date)} */}
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeading} key='subjects'>Months Name</TableCell>
                            <TableCell className={classes.tableHeading} key='tm'>Total Classes</TableCell>
                            <TableCell className={classes.tableHeading} key='om'>Present Classes</TableCell>
                            <TableCell className={classes.tableHeading} key='per'>Present Percenatges</TableCell>
                            <TableCell className={classes.tableHeading} key='grade'>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {this.state.subjects.map((subjects, i)=>
                        <TableRow><TableCell key={i}>{subjects}</TableCell></TableRow>)} */}
                        
                        {this.state.monthName.map((month, i)=>
                        <TableRow key={i}>
                                <TableCell className={classes.tableHeading} key='a'><b>{month}</b></TableCell>
                                <TableCell className={classes.tableHeading} key='b'>{this.state.totalDays[i]}</TableCell>
                                <TableCell className={classes.tableHeading} key='c'>{this.state.presentDays[i]}</TableCell>
                                <TableCell className={classes.tableHeading} key='d'>{Math.round((this.state.presentDays[i]*100)/this.state.totalDays[i])} {'%'}</TableCell>
                                <TableCell className={classes.tableHeading} key='e'>{((this.state.presentDays[i]*100)/this.state.totalDays[i])>90?'A':((this.state.presentDays[i]*100)/this.state.totalDays[i])>70?'B':((this.state.presentDays[i]*100)/this.state.totalDays[i])>50?'C':'D'}</TableCell>
                        </TableRow>)}
                        <TableRow>
                                <TableCell className={classes.tableHeading} key='a'><b>{'Total Attendance'}</b></TableCell>
                                <TableCell className={classes.tableHeading} key='b'>{this.state.TWD}</TableCell>
                                <TableCell className={classes.tableHeading} key='c'>{this.state.TPD}</TableCell>
                                <TableCell className={classes.tableHeading} key='d'>{Math.round((this.state.TPD*100)/this.state.TWD)} {'%'}</TableCell>
                                <TableCell className={classes.tableHeading} key='e'>{((this.state.TPD*100)/this.state.TWD)>60?'GOOD':'BAD'}</TableCell>
                        </TableRow>   
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage([1])(Attendance));
