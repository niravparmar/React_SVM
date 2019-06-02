import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
const styles = theme => ({
    root: { display: 'flex' },

    formControl: { margin: theme.spacing.unit * 3 },

    group: { margin: `${theme.spacing.unit}px 0` },

});



class Graph extends React.Component {
    state = {
        bgData: [],
        doseData: [],
        value: 'bganddose',
        graphOptions: {
            chart: {
                renderTo: 'graph',
                zoomType: 'xy'
            },
            xAxis: {
                gridLineWidth: 1,
            },
            yAxis: [{
                gridLineWidth: 1,
                opposite: false
            }, {
                gridLineWidth: 1,
                opposite: true
            }],
            rangeSelector: {
                selected: 0,
                inputEnabled: false,
                buttons: [{
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'week',
                    count: 2,
                    text: '2w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }],
            },
            // title: {
            //     text: 'Bg and Dose Graph'
            // },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>',
                valueDecimals: 0,
                split: true
            },
            series: [{
                data: []
            }]
        }
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    async componentDidMount() {
        var patientId = this.props.patientId;
        let response = await this.props.authenticatedApiCall('get', '/api/providerservice/patient/' + patientId + '/logbook', null)
        if (response.data.bglog.length > 0) {
            for (var i = 0; i < response.data.bglog.length; i++) {
                this.state.bgData.push([response.data.bglog[i].entrydate, response.data.bglog[i].value]);
                
            }
            for (let i = 0; i < response.data.doselog.length;i++)
            {
                this.state.doseData.push([response.data.doselog[i].entrydate, response.data.doselog[i].value])
            }
            this.setState(prevState => {
                return {
                    graphOptions: {
                        ...prevState,
                        series: [{ data: this.state.doseData, name: "DOSE", color: '#04E1F9', yAxis: 1, type: 'area', showInNavigator: true,
                            fillColor: {
                                linearGradient: [0, 0, 0, 300],
                                stops: [
                                    [0, '#01F3B9'],
                                    [1, '#04E1F9'],
                                    [2, '#04E1F9']
                                ]
                            }
                        },{ data: this.state.bgData, name: "BG", color: '#FC5608', type: 'spline', showInNavigator: true }]
                    }

                }

            })
        } else {
            alert("There is no data to display the Graph...");
        }
    }
    bgAndDose = (event) => {
        console.log(this.state.bgData, this.state.doseData)
        this.setState( {
                graphOptions: {
                    series: [ {data: this.state.doseData, name: "DOSE", color: '#04E1F9', yAxis: 1, type: 'area', showInNavigator: true,
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, '#01F3B9'],
                                [1, '#04E1F9'],
                                [2, '#04E1F9']
                            ]
                        }
                    },{ data: this.state.bgData, name: "BG", color: '#FC5608', type: 'spline', showInNavigator: true }]
                }
            
        })
    };

    onlyBG = (event) => {
        console.log(this.state.bgData)
        this.setState({
                graphOptions: {
                    series: [{ data: this.state.bgData, name: "BG", color: '#FC5608', type: 'spline' }]
                }
        })
    };


    onlyDOSE = (event) => {
        console.log(this.state.doseData)
        this.setState({
                graphOptions: {
                    series: [{
                        data: this.state.doseData, name: "DOSE", color: '#04E1F9', yAxis: 1, type: 'area',
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, '#01F3B9'],
                                [1, '#04E1F9'],
                                [2, '#04E1F9']
                            ]
                        }
                    }]
                }
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            row
                            onChange={this.handleChange}
                            className={classes.group}
                            value={this.state.value}
                        >
                            <FormControlLabel value="bganddose" onChange={this.bgAndDose} control={<Radio />} label="BG and DOSE" />
                            <FormControlLabel value="onlybg" onChange={this.onlyBG} control={<Radio />} label="Only BG" />
                            <FormControlLabel value="onlydose" onChange={this.onlyDOSE} control={<Radio />} label="Only DOSE" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={this.state.graphOptions}
                />

            </div>
        );
    }
}
Graph.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AuthenticatedPage(["Provider", "AccountAdmin", "SuperAdmin", "CoWorker"])(Graph));