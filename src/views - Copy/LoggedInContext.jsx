import React from "react";

const defaultUserObj = {
    name: 'guest',
    isAuthenticated: false,
    role: 'guest',
    permissionlevel: '',
    studenttype: '',
    accesstoken: "",
    studentid:'',
    studentname: ''
};

const UserLoggedInContext = React.createContext({
    userDetails: defaultUserObj,
    changeUser: () => {
        
    }
}
);

const UserLoggedInContextProvider = UserLoggedInContext.Provider;
const UserLoggedInContextConsumer = UserLoggedInContext.Consumer;
export { UserLoggedInContext as default, defaultUserObj, UserLoggedInContextProvider, UserLoggedInContextConsumer};
