import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {getAllNumber} from './actions'

const persons = await getAllNumber();

// let persons = (await axios.get('http://localhost:3001/persons')).data
//  console.log('persons: ', persons)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App persons={persons} />
  </React.StrictMode>
);
