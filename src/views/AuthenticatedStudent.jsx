import  React from "react";
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import withUser from '../views/LoginPage/WithUser';
import _ from 'lodash';

function tieAuthorization(allowedRole,Component)
{
  return class withAuthorization extends React.Component
  {
      makeAuthenticatedAPICall = async (method,url,data) => {
        console.log(method,url);
        try{
          this.props.currentUser.userTimer.setServerAccessed();
        let result = await axios({
             method: method,
             url: url,
             data: data
           })
           if (result.status === 200) {
            return result;
           }
           else{
             return null;
           }
        }catch (ex) {
          console.log("ERROR:",ex);
      }
      }
      render(){
          const {currentUser:userObj} = this.props;
          return(
               (
                      (userObj.userDetails.isAuthenticated && ((Array.isArray(allowedRole)) ? _.includes(allowedRole,userObj.userDetails.role):(userObj.userDetails.role===allowedRole)))?
                      <Component loggedInUserObj={userObj} authenticatedApiCall = {this.makeAuthenticatedAPICall} {...this.props} /> : <Redirect to="/abcd" />
 
              )
          ) 
  }
 }
}

const AuthenticatedPage = allowedRole => Component =>{
   
 return withUser(tieAuthorization(allowedRole,Component));
    
}



export default AuthenticatedPage;