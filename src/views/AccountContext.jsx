import React from "react";


const AccountContext = React.createContext("");



const AccountContextProvider = AccountContext.Provider;
const AccountContextConsumer = AccountContext.Consumer;


const WithAccount = (WrappedComponent) => {
    return class AccountWrapped extends React.Component {
        render() {
            return (
                <AccountContextConsumer >
                    {accountObj => (
                        
                        <WrappedComponent currentAccountId={accountObj} {...this.props} /> 
                    )}
                </AccountContextConsumer>)

        }
    }
}
export {  AccountContextProvider, AccountContextConsumer,WithAccount};
