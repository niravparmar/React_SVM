
import React from 'react';
import AuthenticatedPage from "../AuthenticatedStudent";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Options from './Options';
import ExamCompleted from './ExamCompleted';
import { Typography, Button } from '@material-ui/core';

class Entrance extends React.Component{
    state = {
        time : 60,
        fullquestion: [],
        question: '',
        optiona: '',
        optionb: '',
        optionc: '',
        optiond: '',
        optione: '',
        answer: '', 
        number: 0,
        scroll: 'body',
        examCompleted: false,
        rightAnswer: null,
        startTest: false
    }

  
    async componentDidMount() {
        const token = this.props.currentUser.userDetails.accesstoken
        console.log(token)
        let response = await this.props.authenticatedApiCall('post', '/api/userservice/getclassforquestion', {token:token});
        console.log(response.data)
        this.setState({fullquestion: response.data})
        this.handleNextQuestion();
    }
    handleNextQuestion = () =>{
        if(this.state.fullquestion.length === this.state.number){
            this.setState({examCompleted: true})
            console.log("Completed")
        }
        var num = this.state.number;
        if(this.state.fullquestion.length> num){
        let d = this.state.fullquestion[num]
        this.setState({question:d.question, optiona: d.optiona, optionb: d.optionb, optionc:d.optionc, optiond: d.optiond, optione: d.optione, answer:d.answer})
        if((this.state.fullquestion.length) > (this.state.number)){
            console.log("in")
            num = num + 1;
        }else{
           console.log("out")
        }
        
        this.setState({number: num})
        }
        
    }
    
    right = 0;
    handleAnswer = (ans) =>{
        if(ans == this.state.answer){
            console.log("right")
            this.right = this.right + 1;
        }
        this.setState({rightAnswer: this.right})
        console.log(this.right)
    }
    handleStartTest = () =>{
        this.setState({startTest: true})
    }
    render(){
        return(
            <div>{(this.state.startTest ?
                <Dialog
                    onClose={this.props.dismiss}
                    scroll={this.state.scroll}
                    open={true}
                    aria-labelledby="customized-dialog-title"
                    maxWidth='md'
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.dismiss}>
                    {(this.state.examCompleted ? "":
                    "Total Number of Question:"+ this.state.fullquestion.length )}
                    </DialogTitle>
                    <DialogContent>
                        {(this.state.examCompleted ? <ExamCompleted rightAnswer={this.state.rightAnswer} totalQuestion = {this.state.fullquestion}/>: <Options question={this.state.question} optiona={this.state.optiona} optionb={this.state.optionb} optionc={this.state.optionc} optiond={this.state.optiond} optione={"None of these"} handleAnswer={this.handleAnswer}/>)}    
                             {/* {"Question : "+this.state.number+ " " + this.state.question}<br></br>
                             {"Option A : "+this.state.optiona}<br></br>
                             {"Option B : "+this.state.optionb}<br></br>
                             {"Option C : "+this.state.optionc}<br></br>
                             {"Option D : "+this.state.optiond}<br></br>
                             {"Option E : "+" None Of these"}<br></br> */}
                    </DialogContent>
                    {(this.state.examCompleted ? "": 
                    <DialogActions>
                        <Button onClick={this.handleNextQuestion} color="primary"> Next </Button>
                    </DialogActions>)}
                </Dialog> : 
                <Dialog
                    onClose={this.props.dismiss}
                    scroll={this.state.scroll}
                    open={true}
                    aria-labelledby="customized-dialog-title"
                    maxWidth='md'
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.dismiss}>
                    <Typography>** Important Information **</Typography>
                    <Typography>Please read the instructions carefully.</Typography>
                    <hr></hr>
                    <span>1. Welcome to Online Examination, If you are feeling well and want to start the test then click on Start button.</span><br/>
                    <span>2. Don't Refresh the page during your examination.</span><br/>
                    <span>3. Press Next Button for next question.</span><br/>
                    <span>4. When will your exam don't close the tab Note done your reasult.</span><br/>
                    </DialogTitle>
                    <DialogContent>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleStartTest} color="primary"> Start Your Test </Button>
                    </DialogActions>
                </Dialog>)}
            </div>
        )
    }
}
export default AuthenticatedPage([2])(Entrance);