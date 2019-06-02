import React from 'react'
import Spinner from '@material-ui/core/CircularProgress';
import queryString from 'query-string'
export default class formReloader extends React.Component { 
  render() 
  {
     setTimeout(()=>{
        if(this.props.location.state){
          this.props.history.push(('./'+queryString.parse(this.props.location.search).reloadTo+"/"+this.props.location.state))
        }else{ this.props.history.push('./'+queryString.parse(this.props.location.search).reloadTo);
      }
      }, parseInt(queryString.parse(this.props.location.search).timeOut));
    return (
       
      <div>
            <Spinner />      
    </div>
    )
  }
}
