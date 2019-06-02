import React, { Fragment } from 'react';
import AuthenticatedPage from "./AuthenticatedPage";
import { Card, CardContent,Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import logo from '../assets/images/isage-logo-print.png'
import Moment from 'react-moment';

const styles = theme => ({
    root: {
      maxWidth: '1000px',
      margin: '0 auto',
      overflowX: 'auto',
    },
    table: {
      minWidth: 800,
    },
    tableBorder:{
        borderTop: '2px solid black',
        borderBottom:'2px solid black',
        maxWidth:150
    },
    tableBorder1:{
        borderTop: '2px solid black',
        borderBottom:'2px solid black',
        borderLeft: '2px solid black'
    },
    tableBorder2:{
        background: '#333 !important',
        color: '#fff !important',
        borderLeft: '2px solid white'
    },
    header:{
        padding: '15px 0 30px 0',
        boxShadow: '0 5px 6px -6px #222 !important',
     
    },
    underline:{
        textDecoration: 'underline',
        fontSize: '20px',
        marginRight: '5px'
    },
    texts:{
        fontSize: '20px'
    }
  });
  
class PrintDetails extends React.Component {
    state = {
        medname: '',
        firstname: '',
        downloadUrl: '',
        doctor_firstname: '',
        doctor_lastname: '',
        startingdose: '',
        frequency: '',
        slottime: '',
        targetlower: '',
        targetupper: '',
        range: []
    }
    async componentDidMount() {
        let patientid = this.props.match.params.patientid
        let res = await this.props.authenticatedApiCall('post', '/api/ProviderService/printDetails', { patientid: patientid });
        if(res.data.status!=0){
        this.setState({
            medname: res.data.medname,
            firstname: res.data.firstname,
            downloadUrl: res.data.downloadUrl,
            doctor_firstname: res.data.doctor_firstname,
            doctor_lastname: res.data.doctor_lastname,
            startingdose: res.data.startingdose,
            frequency: res.data.frequency,
            slottime: res.data.slottime,
            targetlower: res.data.targetlower,
            targetupper: res.data.targetupper,
            range: res.data.range
        })
    }else{
        alert("Patient not found")
    }
    }
    todayDate() {
        var today = new Date();
        return (
            <Moment format="MMMM D, YYYY" withTitle>
                {today}
            </Moment>
        );
        }
    render() {
        const { classes } = this.props;

        var qrdownloadUrl = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=H&chl=" + `${this.state.downloadUrl}`;
        return (
            <Fragment>
                <Grid container  >
                    <Grid item xs={12} >
                        <Card boxShadow={0} className={classes.root}>
                            <CardContent  >
                                <Grid container className={classes.header}>
                                    <Grid item xs={3}>
                                        <img src={logo} alt="logo"  />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography  align="center" >
                                            <h1 style={{marginTop:0}}>{this.state.medname} Titration Plan</h1>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography style={{ paddingTop: 10}} align="right">
                                            {this.todayDate()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={40} >
                                    <Grid item xs={8}>
                                        <h2><span>{this.state.firstname}</span>,</h2>
                                        <p>Welcome to <b>iSage RX</b>, your {this.state.medname} support app. To get started,<b> download</b> the iSage RX app from the <b>AppStore</b> or <b>Google Play</b>. You will need to enter your Activation Code and Date of Birth to access the app.</p>

                                    </Grid>
                                    
                                    <Grid item xs={4} align="right">
                                        < img src={qrdownloadUrl} />
                                        <p align="left" style={{width:'150px'}}><i><span>Scan QR code to download iSage RX app.</span></i></p>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <p> <span>Dr. {this.state.doctor_firstname} {this.state.doctor_lastname} has prescribed iSage RX for you to help get your fasting blood sugar to target. iSage RX is really simple to use:</span></p>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={6}>
                                        <p>
                                            <span className = {classes.underline}>1 </span><span className = {classes.texts}> Check </span><span> your fasting blood sugar every day</span>
                                        </p>
                                        <p>
                                            <span className = {classes.underline}>2 </span><span className = {classes.texts}> Record </span><span>your blood sugar in the app</span>
                                        </p>
                                        <p>
                                            <span className = {classes.underline}>3 </span><span className = {classes.texts}> Take </span><span>the units of {this.state.medname} displayed in the app</span>
                                        </p>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container>
                                    <Grid item xs = {12}>
                                        <span style={{ fontSize: 22, fontWeight:400 }}>Your Titration Plan Overview from Dr. {this.state.doctor_firstname} {this.state.doctor_lastname}</span>
                                        <Table className={classes.table}>
                                          
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left" className={classes.tableBorder}><b>Insulin Brand</b></TableCell>
                                                    <TableCell align="left" className={classes.tableBorder1}>{this.state.medname}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className={classes.tableBorder}><b>Starting Dose</b></TableCell>
                                                    <TableCell align="left" className={classes.tableBorder1}>{this.state.startingdose} Units</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className={classes.tableBorder}><b>Dose Adjustment Frequency</b></TableCell>
                                                    <TableCell align="left" className={classes.tableBorder1}>{this.state.frequency} Day(s)</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className={classes.tableBorder}><b>Time of Day to Take Insulin</b></TableCell>
                                                    <TableCell align="left" className={classes.tableBorder1}>{this.state.slottime == 1 ? 'Morning' : 'Evening'}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className={classes.tableBorder}><b>Target Fasting Blood Sugar Range</b></TableCell>
                                                    <TableCell align="left" className={classes.tableBorder1}>{this.state.targetlower} - {this.state.targetupper} mg/dL</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className={classes.tableBorder}></TableCell>
                                                    <TableCell align="left" className={classes.tableBorder1}></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center" className={classes.tableBorder2}><b>Average Blood Sugar</b></TableCell>
                                                    <TableCell align="center" className={classes.tableBorder2}><b>Change in {this.state.medname} Dose</b></TableCell>
                                                </TableRow>
                                                {this.state.range.map(item =>(
                                                <TableRow>
                                                    <TableCell align="left" className={classes.tableBorder}>{item.min==0?'Less than '+item.max: item.max!=null?`Between ${item.min} - ${item.max}`:'Above '+item.min} mg/dL</TableCell>
                                                    <TableCell align="left" className={classes.tableBorder1}>{item.diff<0?`Reduce dose by ${Math.abs(item.diff)}`:item.diff>0?`Increase dose by ${item.diff}`:'No change to dose'}  Units</TableCell>
                                                </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                    <p><span>
                                    If you have any questions about iSage RX, you can send an email to <b>help@isageapp.com</b>. 
                                    If you need medical help, <b>Call 911 for emergencies or Dr. {this.state.doctor_firstname} {this.state.doctor_lastname} for medical problems</b>. We look forward to supporting you on your insulin journey.
                                        </span></p>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}
export default withStyles(styles)(AuthenticatedPage(["Provider","CoWorker"])(PrintDetails));