import React from 'react';
import axios from 'axios';
import { Link,Redirect } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import {InputAdornment,Button} from "@material-ui/core";
import {Email,Lock} from "@material-ui/icons";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import WithUser from "./WithUser";
import { Formik, Form, Field } from 'formik';
import { string, object} from 'yup';
import FormikTextField from '../../components/FormikValidatedComponents/TextField';

import { withTranslation } from 'react-i18next';

const styles = theme => ({
  orangeBtn: {
    color: "#fff",
    background: "orange"
  }
});
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
   
    this.yupSchema = object().shape({
      email: string().required("ERROR").email("Login Error"),
      password:string().required("password cannot be blank")
  });
    this.state = {
      renderto : '',
      loginSucess: false,
      userError : '',
    }
  }

  
  handleSubmit = (values, { setSubmitting }) => {
    
    axios.post('/api/providerauthservice/login', {
      username: values.email,
      password: values.password
    }).then (response => {
        if(response.data.status === 1)
        {
          if(response.data.userrole === 'SuperAdmin')
          {
            this.setState({ renderto: '/superadmin'})
          }
          else if(response.data.userrole === 'AccountAdmin')
          {
            this.setState({ renderto : '/admin'})
          }
          else if(response.data.userrole === 'Provider')
          {
            this.setState({renderto : '/teacher'})
          }
          else if(response.data.userrole === 'CoWorker')
          {
            this.setState({renderto : '/coworker'})
          }
          this.setState({loginSucess:true});
          this.props.currentUser.changeUser({
            name: 'abcd',
            isAuthenticated: true,
            role: response.data.userrole,
            permissionlevel: response.data.permissionlevel,
            firstname: response.data.firstname,
            lastname: response.data.lastname
          });

        }
        else if (response.data.status === 0){
          this.setState({ 
            userError: response.data.warningmessage
          })
        
         console.log(this.state.userError);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { classes , t} = this.props;
    const loginCompleted = this.props.currentUser.userDetails.isAuthenticated && this.state.loginSucess;
    return (
      <div>
       {loginCompleted? (
         
        <Redirect to={this.state.renderto} />): (
          
        <Formik initialValues={{ email: "", password:""}} onSubmit={this.handleSubmit} validationSchema={this.yupSchema}
                 >
                 {(props) => (
                   <Form>
                         <Card >
             
                         
          <CardBody>

            <Field
              component={FormikTextField}
              label= "Email Address"
              id="email"
              onChange={this.handleChange}
              name="email"
              fullWidth
              InputProps={{
                type: "email",
                endAdornment: (
                  <InputAdornment position="end">
                    <Email />
                  </InputAdornment>
                )
              }}
            />
            <Field
              component={FormikTextField}
              label="Password"
              id="password"
              fullWidth
              name="password"
              InputProps={{
                type: "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <Link to={"/public/ForgetPassword/"}> Forgot Password</Link>
                    <Lock />
                  </InputAdornment>
                )
              }}
            />
            <p style={{color:"red"}} >{this.state.userError}</p>
          </CardBody>
          <CardFooter className={classes.cardFooter} disabled={props.isSubmitting} style={{ justifyContent: "center" }} >
            <Button type="submit" className={classes.orangeBtn} size="small">
                    Login
              </Button>
          </CardFooter>
          </Card>
          </Form>

                 )}

        </Formik>
       )}
       </div>
    );
  }
}

export default withStyles(styles)(WithUser(LoginPage));
