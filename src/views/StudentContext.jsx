import React from "react";

const studentObj = {
    isAuthenticated: false,
    studentdetails: null,
    studenttype: null,
}
const StudentContext = React.createContext({
   studentDetails: studentObj,
   changeStudent: () =>{

   }
});



const StudentContextProvider = StudentContext.Provider;
const StudentContextConsumer = StudentContext.Consumer;



export { StudentContext as default, studentObj, StudentContextProvider,StudentContextConsumer};
