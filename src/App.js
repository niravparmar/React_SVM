import React from 'react';
import { defaultUserObj, UserLoggedInContextProvider} from "./views/LoggedInContext"
import { Switch, Route, Redirect,BrowserRouter as Router} from "react-router-dom";
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Spinner from '@material-ui/core/CircularProgress';
import PublicPage from './views/LoginPage/PublicPage';
import countDownTimer from './views/timeout';
import  UnableToLogin from './views/LoginPage/UnableToLogin';
// import i18n from './i18nTranslation';

/*
import SuperAdmin from './views/SuperAdmin/SuperAdmin';
import Provider from './views/Provider/Provider';
import AccountAdmin from './views/AccountAdmin/AccountAdmin';
import CoWorker from './views/CoWorker/CoWorker';
import PrintDetails from './views/PrintDetails'

*/
const SuperAdmin = React.lazy(()=> import (/*webpackChunkName: 'SuperAdmin' */ './views/SuperAdmin/SuperAdmin'));
const Teacher = React.lazy(()=> import (/*webpackChunkName: 'Provider' */ './views/Teacher/Teacher'));
const AccountAdmin = React.lazy(()=> import (/*webpackChunkName: 'AccountAdmin' */ './views/AccountAdmin/AccountAdmin'));
const StudentHomePage = React.lazy(()=> import (/*webpackChunkName: 'CoWorker' */ './views/Student/StudentHomePage'));
const Parent = React.lazy(()=> import (/*webpackChunkName: 'CoWorker' */ './views/Parent/Parent'));
const TestHomePage = React.lazy(()=> import (/*webpackChunkName: 'CoWorker' */ './views/Entrance/TestHomePage'));
const CoWorker = React.lazy(()=> import (/*webpackChunkName: 'CoWorker' */ './views/CoWorker/CoWorker'));


const PrintDetails = React.lazy(()=>import (/*webpackChunkName: 'Print' */ './views/PrintDetails'));



const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: "#fff"
    },
    secondary: {
      main: "rgba(222, 64, 119, 1)",
    },
    primary: {
      main: "#39a7df",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: "'Roboto', 'Helvicta','Arial',sans-serif"
  },
  overrides: {
    MUIDataTable:
    {
    responsiveScroll:{
            "max-height": "100%", 
        }
    },
    MuiTableCell : 
    {
           root :
     {
        "padding" : "4px 15px 4px 16px"
    }
},
MuiTableRow : {
    root :{
        '&:nth-of-type(odd)': {
            backgroundColor: "#f3f3f3",
        },
    }
}
}
});

class App extends React.Component {

  constructor(props) {
    super(props);

    let lsUserAuth = localStorage.getItem('UserAuth');
    try {
      lsUserAuth = JSON.parse(lsUserAuth);
    }
    catch(error)
    {
      lsUserAuth = null;
    }
    this.state = {
      userDetails:lsUserAuth ? lsUserAuth:defaultUserObj,
      changeUser: this.changeUser,
      userTimer: countDownTimer(),
     
    }
  };



  changeUser = (userObj) => {
    if(userObj)
    {
    localStorage.setItem('UserAuth', JSON.stringify(userObj));
    this.setState({ userDetails: userObj });
    }
    else{
      localStorage.setItem('UserAuth',JSON.stringify(defaultUserObj));
      this.setState({userDetails:defaultUserObj});

    }
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <CssBaseline/>
        <UserLoggedInContextProvider value={this.state}>
          {/* <Suspense fallback={<Spinner />}> */}
          <Router basename = {process.env.PUBLIC_URL}>
            <Switch>
            <Route path={`/print/:patientid`} component={PrintDetails}/>
              <Route path='/teacher' component={Teacher} />
              <Route path='/coworker' component={CoWorker} />
              <Route path='/superadmin' component={SuperAdmin} />
              <Route path='/admin' component={AccountAdmin} />
              <Route path='/student' component={StudentHomePage} />
              <Route path='/admin' component={Parent} />
              <Route path='/entrance' component={TestHomePage} />
              <Route path='/public' component={PublicPage}/>
              <Route path='/abcd' component={UnableToLogin}/>
              <Redirect to = '/public'/>
            </Switch>
         </Router>
         {/* </Suspense> */}
        </UserLoggedInContextProvider>
      </MuiThemeProvider>
    )
  };
}
export default App;
