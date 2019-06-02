import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import Select from 'mui-select-with-search-vivek';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import ActionButton from '../../components/ActionAdminQuestion';
import Paper from '@material-ui/core/Paper';
import MuiThemeDataTable from '../../components/MuiThemeDataTable';
import { lazyWithPreload } from '../../components/LazyLoader';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

const Logbook = lazyWithPreload(() =>{
    return import('../Logbook/Logbook');
})
const classOptions = [{ value:1, label:"6th"},{value:2, label:"7th"}, {value:3, label:"8th"}, {value:4, label:"9th"}, {value:5, label:"10th"}, {value:6, label:"11th"}, {value:7, label:"12th"}];

const styles = theme => ({
    root: {
        // padding : "1",
        marginTop: theme.spacing.unit * 0.5,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
       
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    selectItemWrapper:{
        display:'inline-Flex',
        alignItems:'center',
        margin:"10px"
    }
});

class QuestionList extends React.Component {
    state = {
        questions: [],
        accountid: null,
        providers: [],
        providerid: null,
        students: [],
        logbookDialogPatientId:null,
        studentName: '',
        anchorEl: null,
    };

    tableheads1 = [
        {
            name: "qid",
            label: "SR. No.",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "question",
            label: "Question",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "optiona",
            label: "Option A",
            options: {
                filter: true,
                sort: true,
                searchable: true,
            }
        },

        {
            name: "optionb",
            label: "Option B",
            options: {
                filter: true,
                sort: true,
                searchable: false
            }
        },
        {
            name: "optionc",
            label: "Option C",
            options: {
                filter: false,
                sort: true,
                searchable: true
            }
        },
        {
            name: "optiond",
            label: "Option D",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "answer",
            label: "Answer",
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                print : false,
                customBodyRender: (value) => {
                    return (
                        <ActionButton questionid={value.qid}  editQuestion={this.onEditQuestion} deleteQuestion={this.onDeleteQuestion}/>
                    )
                }
            }
        }
    ];
    onEditQuestion = (questionid) => {
        this.props.history.push('./edit-question/'+questionid);
    }
    onDeleteQuestion = async(questionid) => {
        let url = "/api/ProviderService/" + questionid + "/deletequestion";
        let response = await this.props.authenticatedApiCall('delete', url, null)
        if(response){
            alert("Question Deleted Successfully")
        }else{
            alert("Unable To Delete");
        }
    }

    handleClassChange = async selectedValue => {
        console.log(selectedValue)
        this.setState({
            providers: selectedValue,
            students: []
        })
        let url = "/api/ProviderService/" + selectedValue.value + "/getclassforquestion";
        let response = await this.props.authenticatedApiCall('get', url, null)
        console.log(response.data)
        if (response.data.length > 0) {
            response.data.forEach((item) => {
                item.Action = { qid : item.qid }
                if(item.answer === "1"){item.answer = item.optiona}
                else if(item.answer === "2"){item.answer = item.optionb}
                else if(item.answer === "3"){item.answer = item.optionc}
                else if(item.answer === "4"){item.answer = item.optiond}
                else if(item.answer === "5"){item.answer = item.optione}
            });
            this.setState({
                questions: response.data
            })
            if (this.state.patients !== null) {
                return
            }
        }
    };
    dismissDialog = () => this.setState({logbookDialogPatientId:null});

    render() {
        const classes = this.props;
        return (
            
            <div>
                <GridContainer justify="center">
                    <GridItem md={12}>
                <Paper className={classes.root} elevation={1}>
                <div className = {this.props.classes.selectItemWrapper}>
                <InputLabel>Class</InputLabel>
               
                <FormControl
          style={{ width: 350 }}
        >
                <Select
                    value={this.state.providers}
                    onChange={this.handleClassChange}
                    options={classOptions}
                    placeholder='Select Class'
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                >
                   
                </Select>
                </FormControl>
 </div>

               
                </Paper>
                {/* <DynamicTable rows={this.state.patients} tableheads={tableheads} keyNames={keyNames} buttonTitle="Action"{...this.props} /> */}
                <MuiThemeDataTable title ={'Question List'} rows={this.state.questions} columns={this.tableheads1} />
                {(this.state.logbookDialogPatientId ? <Logbook studentid={this.state.logbookDialogPatientId} studentName={this.state.studentName} dismiss={this.dismissDialog} /> : "")}
                </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(styles)(AuthenticatedPage("CoWorker")(QuestionList));
