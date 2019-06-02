import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import Select from 'mui-select-with-search-vivek';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator-vivek';
import { Button, Card, CardContent, FormLabel, CardActions, FormControl, InputLabel, Paper } from '@material-ui/core';
import SuccessDialog from '../../components/SuccessDialog';

const subjectOptions = [{ value: 1, label: 'Hindi' }, { value: 2, label: 'English' }, { value: 3, label: 'Maths' }, { value: 4, label: 'Science' }, { value: 5, label: 'History' }, { value: 6, label: 'Geography' }, { value: 7, label: 'physics' }, { value: 8, label: 'Chemistry' }]



const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 0.2,  paddingTop: theme.spacing.unit * 2, paddingBottom: theme.spacing.unit * 2,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    selectItemWrapper: {
        display: 'inline-Flex', alignItems: 'center', margin: "10px"
    },
    ptnLabel: {
        alignSelf: "center",
    },
    mdBtm10: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: "10px"
        }
    },
    selectContainer: {
        width: "100%"
    },
    questionContainer: {
        display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "15px"
      },
      labelContainer: {
        width: "200px", textAlign: "right", marginRight: "35px", fontSize: "14px", fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'",
      },
      inputItem: {
        width: 400
      },
      selectContainer: {
        width: 200
      },
      cardRoot: {
        "overflow": "initial"
      },
      OkButton:{
        backgroundColor: "#db6336", borderRadius: "15px", fontSize: "12px", color: "#fff", padding: "10px",  width: "100px"
    }
});

class CreateResult extends React.Component {
    state = {
        subjects: [], subjectid: null, obtainMarks: '', totalMarks: '', resultSuccess: false
    }
    handleSubjects = async (selectedSubject) => {
        console.log(selectedSubject)
        this.setState({ subjectid: selectedSubject })
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
      }
    async componentDidMount() {
        var studentid = this.props.studentid;
        let response = await this.props.authenticatedApiCall('get', '/api/ProviderService/'+studentid+'/assignsubjects', null);
        let sub = [];
        if (response != null) {
            let subjects = response.data.map((item) => {
                subjectOptions.forEach(subject => {
                    if (item.subjects == subject.value) {
                        item.subjects = subject.label
                        item.subjectid = subject.value
                    }
                })
                return { value: item.subjectid, label: item.subjects }
            })
            this.setState({ subjects: subjects })
        } else { }
    }

    handleSubmit = async event => {
        console.log("submitted")
        console.log(this.state.totalMarks+ " "+this.state.obtainMarks+ " "+this.state.subjectid.value)
        let response = await this.props.authenticatedApiCall('post', "/api/ProviderService/studentResult/" + this.props.studentid, {
            totalMarks: this.state.totalMarks,
            obtainMarks: this.state.obtainMarks,
            subjectid: this.state.subjectid.value
        })
        if (response.data.status == 1)
        this.setState({resultSuccess: true})
        else
            alert('Something went wrong');
        event.preventDefault();
    }
    backDashboard = () =>{
        this.setState({resultSuccess: false})
    }
    //9864076550
    render() {
        const { classes, t } = this.props;
        console.log(this.state.subjects)
        const OkButton = [<Button className={classes.OkButton} onClick={this.backDashboard}>Ok</Button>]
        const HeaderText = "Success"
        const BodyText = "Student result created Successfully."
        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={6} className={classes.mdBtm10}>
                                        <GridContainer>
                                            <GridItem xs={3} sm={3} md={3} className={classes.ptnLabel}>
                                                <InputLabel>Subjects</InputLabel>
                                            </GridItem>
                                            <GridItem xs={9} sm={9} md={9}>
                                                <FormControl className={classes.selectContainer}>
                                                    <Select
                                                        value={this.state.subjectid}
                                                        onChange={this.handleSubjects}
                                                        options={this.state.subjects}
                                                        placeholder="Select Subject"
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                    >
                                                    </Select>
                                                </FormControl>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>

                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                </Paper>
                <Card className={classes.cardRoot}>
          <ValidatorForm onSubmit={this.handleSubmit}>
            <CardContent>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Total Marks </FormLabel>
                <TextValidator
                  className={classes.inputItem}
                  label="Total Marks"
                  onChange={this.handleChange}
                  name="totalMarks"
                  value={this.state.totalMarks}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              <div className={classes.questionContainer}>
                <FormLabel className={classes.labelContainer} component="span"> Obtain Marks </FormLabel>
                <TextValidator
                  className={classes.inputItem}
                  label="Obtain Marks"
                  onChange={this.handleChange}
                  name="obtainMarks"
                  value={this.state.obtainMarks}
                  withRequiredValidator
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </div>
              
            </CardContent>
            <CardActions>
              <Button type="submit" color="primary" size="small">
                Create
                </Button>
            </CardActions>
          </ValidatorForm>
        </Card>
        {(this.state.resultSuccess ? <SuccessDialog successButton={OkButton} HeaderText={HeaderText} BodyText={BodyText} dismiss={this.backDashboard} />: "")}
            </div>
        );
    }
}


export default withStyles(styles)(AuthenticatedPage("Provider")(CreateResult));   
