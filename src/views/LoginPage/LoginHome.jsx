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
class LoginHome extends React.Component {
  constructor(props) {
    super(props);
   
    this.yupSchema = object().shape({
      username: string().required("Username is required"),
      password:string().required("password cannot be blank")
  });
    this.state = {
      renderto : '',
      loginSucess: false,
      userError : '',
      studenttype: '',
      studentdetails: ''
    }
  }

  
  handleSubmit = (values, { setSubmitting }) => {
    
    axios.post('/api/patientauthservice/login', {
      username: values.username,
      password: values.password
    }).then (response => {
          if(response.data.studenttype == 1)
          {
            console.log("login succcessfully")
            this.setState({ renderto: '/student'})
          }
          else if(response.data.userrole === 'Parent')
          {
            this.setState({ renderto : '/parent'})
          }
          else if(response.data.studenttype == 2)
          {
            this.setState({ renderto : '/entrance'})
          }
          
          this.setState({loginSucess:true,  studenttype: response.data.studenttype, studentdetails: response.data, isAuthenticated: true,});
          this.props.currentUser.changeUser({
            isAuthenticated: true,
            role: response.data.studenttype,
            accesstoken: response.data.access_token,
            studentid:  response.data.studentid,
            studentname: response.data.firstname+" "+response.data.lastname
          });

        // }
        // else if (response.data.status === 0){
        //   this.setState({ 
        //     userError: response.data.error
        //   })
        
        //  console.log(this.state.userError);
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
// console.log(this.props)
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
              label= "Username"
              id="username"
              onChange={this.handleChange}
              name="username"
              fullWidth
              InputProps={{
                type: "text",
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
                   Submit
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

export default withStyles(styles)(WithUser(LoginHome));
