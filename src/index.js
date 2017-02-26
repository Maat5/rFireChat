import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './app/app';
import config from '../config/config';

import './styles.js';

firebase.initializeApp(config.firebase);

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);