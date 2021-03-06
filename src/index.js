import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';


/** Global axios interceptors */
//axios.defaults.baseURL = "https://api.expovin.it/moneypocket/";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
