import ReactDOM from 'react-dom';
import React from 'react';
import * as serviceWorker from './serviceWorker';
import "./index.css";
import App from "./App";
import axios from 'axios';


let getConfig = async ()=>{
    let result = await axios.get('/api/providerauthservice/getconfig');
    return result.data;
}

getConfig().then(function(configObject)
{
    ReactDOM.render(<App _config={configObject} />, document.getElementById('root'));


}).catch(function(err)
{
    console.log(err);
    alert('Unable to download config. Fatal error.')
});


    


 
 
serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
