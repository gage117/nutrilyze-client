import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App/App';
import Store from './components/Store/Store';
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <App Store={Store}/>
  </BrowserRouter>, 
  document.getElementById('root'));