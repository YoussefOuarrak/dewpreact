import React from 'react';
import ReactDOM from 'react-dom';
import "uikit/dist/js/uikit.min"; 
import "uikit/dist/css/uikit.min.css";
import './index.css';
import './style/style.css';


import './temp/assets/css/style.css';
import './temp/assets/css/preloader.css';
import './temp/modules/materialize/materialize.min.css';
import './temp/modules/fonts/mdi/appicon/appicon.css';
import './temp/modules/fonts/mdi/materialdesignicons.min.css';
import './temp/modules/perfect-scrollbar/perfect-scrollbar.css';

import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  document.body.setAttribute('data-theme', "orange")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
