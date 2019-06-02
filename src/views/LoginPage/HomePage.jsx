import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/LockOutlined";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
const styles = theme => ({
    orangeBtn: {
        color: "#fff",
        background: "orange"
    }
});
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit = event => {

        fetch('/api/providerauthservice/login',
            {
                method: "POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.parse({
                    username: this.state.email,
                    password: this.state.password
                })
            }).then((response) => {
                console.log(response)
                if (response.status === 200) {
                    alert(response + "success");
                }
                else
                    alert(JSON.stringify(response));
            })
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (


            <Card >
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <CardBody>
                        <TextValidator
                            label="Email..."
                            id="email"
                            onChange={this.handleChange}
                            name="email"
                            value={this.state.email}
                            validators={['required', 'isEmail']}
                            errormessages={['this field is required', 'email is not valid']}
                            fullWidth
                            required
                            InputProps={{
                                type: "email",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Email />
                                    </InputAdornment>
                                )
                            }}
                        />
                        </CardBody>
        
                 
                </ValidatorForm>
            </Card>

        );
    }
}

export default withStyles(styles)(HomePage);