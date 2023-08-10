import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios'

const countries = (await axios.get('https://restcountries.com/v3.1/all')).data

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {countries ? <App countries={countries} /> : <div><h1>Loading...</h1></div>}
  </React.StrictMode>
);

