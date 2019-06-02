import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { Link } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import Email from "@material-ui/icons/Email";
import { Dialog, DialogContent, DialogActions, InputAdornment} from '@material-ui/core';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { string, object} from 'yup';


const styles = theme => ({
    orangeBtn: {
        color: "#fff",
        background: "orange"
    }
});

const yupSchema = object().shape({
    email: string().required("Email is Required").email("Not a valid email")
});



class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopUp: false,
            popUpMsg: ''
        }
    }

    handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        axios.post('/api/providerauthservice/forgetPassword', { emailid: values.email }
        ).then(result => {
            if (result.data.status === 1) {
                this.setState({
                    openPopUp: true,
                    popUpMsg: 'We have sent a reset link to your registered email id, check your email to reset your password.',
                });
                setSubmitting(false);
            }
            else if (result.data.status === 0) {
                this.setState({
                    openPopUp: true,
                    popUpMsg: 'User does not exist in our system.',
                });
                setSubmitting(false);
            }
        })
    }

    handleClose = (event) => {
        this.setState({ openPopUp: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <Card >
                <Formik initialValues={{ email: ""}} onSubmit={this.handleSubmit} validationSchema={yupSchema}
                 >
                    {(props) => (
                        <Form>
                            <CardBody>
                                <h5> Forgot Your Password?</h5>
                                <p>Don't worry, it happens to the best of us. To reset your password, enter the email address you use to sign in to iSage RX</p>
                                <Field
                                    name="email"
                                    fullWidth
                                    label="email"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email />
                                            </InputAdornment>
                                        )
                                    }}
                                    component={FormikTextField}
                                />
                            </CardBody>
                            <CardFooter className={classes.cardFooter} style={{ justifyContent: "center" }} >
                                <Button type="submit" className={classes.orangeBtn} disabled={props.isSubmitting} size="small">
                                    Confirm
                    </Button>
                                <Link to={"/public/Login/"}>Back to Login</Link>
                            </CardFooter>
                        </Form>
                    )}
                </Formik>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.openPopUp}>
                    <DialogContent >{this.state.popUpMsg}</DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        )
    }
}

export default withStyles(styles)(ForgetPassword);