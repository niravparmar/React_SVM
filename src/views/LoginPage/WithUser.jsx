import React from "react";
import { UserLoggedInContextConsumer } from "../LoggedInContext";


const WithUser = (WrappedComponent) => {
    return class UserWrapped extends React.Component {
        render() {
            return (
                <UserLoggedInContextConsumer >
                    {userObj => (
                        
                        <WrappedComponent currentUser={userObj} {...this.props} /> 
                    )}
                </UserLoggedInContextConsumer>)

        }
    }
}

export default WithUser;