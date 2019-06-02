import {createMuiTheme } from "@material-ui/core/styles";


export default function newTheme(theme)
{

return createMuiTheme({
  custom:{
    loginBgImage: theme.loginBGImage,
    loginLogo : theme.loginLogo,
    navbarImage: theme.navbarImage,
    printDetailLogo: theme.printDetailLogo,
    printDetailLink: theme.printDetail,
    printDetailsQRCode: theme.printDetailsQRCode,
    printDetailsPhoneImage: theme.printDetailsPhoneImage,
    profilePic: theme.profilePic,
  },

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
      main: theme.secondaryColor,
    },
    primary: {
      // light : "#fff",
      dark: "",
      main: theme.primaryColor,
    },
    thirdColor:{
      main:theme.thirdColor
    },
    hoverPrimaryColor:{
      main: theme.hoverPrimaryColor
    },
    hoverSecondaryColor:{
      main: theme.hoverSecondaryColor
    },
    hoverThirdColor:{
      main:theme.hoverThirdColor
    },
    border:{
      primaryBorder:theme.primaryBorder,
      secondaryBorder:theme.secondaryBorder,
      thirdBorder:theme.thirdBorder,
      hoverPrimaryBorder:theme.hoverPrimaryBorder,
      hoverSecondaryBorder:theme.hoverSecondaryBorder,
      hoverThirdBorder:theme.hoverThirdBorder
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      textPrimaryColor:theme.textPrimaryColor,
      textSecondaryColor:theme.textSecondaryColor,
      textThirdColor:theme.textThirdColor,
      hoverTextPrimaryColor:theme.hoverTextPrimaryColor,
      hoverTextSecondaryColor:theme.hoverTextSecondaryColor,
      hoverTextThirdColor:theme.hoverTextThirdColor,
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "#515974",
      third:"#fff",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    logbook:{
      logbookFasting:theme.logbookFasting,
      logbookNonFasting:theme.logbookNonFasting,
      logbookInsulin:theme.logbookInsulin,
      viewcoworker:theme.viewcoworker
    },
    graph:{
      bgcolor: theme.bgcolor,
      med1GraphStartColor: theme.med1GraphStartColor,
      med1Color: theme.med1Color,
      med1GraphEndColor: theme.med1GraphEndColor
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: "'Roboto', 'Helvicta','Arial',sans-serif",
    button:{
      textTransform: "capitalize"
    }
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
    },
},
MuiTableRow : {
    root :{
        '&:nth-of-type(odd)': {
            backgroundColor: "#f3f3f3",
        },
    }
}
  }
  })
}