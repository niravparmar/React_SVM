import React from 'react';
import {StudentContextConsumer} from '../StudentContext';
 
const WithStudent = (WrappedComponent) => {
    return class StudentWrapped extends React.Component {
        render() {
            console.log("context")
            return (
                <StudentContextConsumer >
                    {studentObj => (
                        
                        <WrappedComponent currentStudent = {studentObj} {...this.props} /> 
                    )}
                </StudentContextConsumer>)

        }
    }
}

export default WithStudent 