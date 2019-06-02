import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Result from './Result';
import Attendance from './Attendance';
import Graph from './Graph';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class LogbookTab extends React.Component {
  state = {
    value: 0,
    studentid: '',
    resultdata : true,
    graphdata : false,
    attendancedata : false,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getResultData = () =>{
  this.setState({resultdata : true, attendancedata : false, graphdata : false}); 
}
getGraphData = () =>{
  this.setState({graphdata : true, resultdata : false, attendancedata : false}); 
}
getAttendancehData = () =>{
  this.setState({attendancedata : true, resultdata : false, graphdata : false}); 
}
  render() {
    const { classes } = this.props;
    return (
      <div>
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Result"  onClick={this.getResultData} />
          <Tab label="Graph" onClick={this.getGraphData}/>
          <Tab label="Attendance" onClick={this.getAttendancehData}/>
        </Tabs>
      </Paper>
      <br/>
      {(this.state.resultdata?<Result studentid = {this.props.studentid}/>:"")}
      {(this.state.graphdata?<Graph studentid = {this.props.studentid}/>:"")}
      {(this.state.attendancedata?<Attendance studentid = {this.props.studentid}/>:"")}
      </div>
    );
  }
}

LogbookTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogbookTab);
