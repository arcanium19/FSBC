import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Button from './Button';
import Display from './Display';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = bad + neutral + good;
  let average = (good - bad) / 100;
  let promedioGood = good / total;

  const handleGood = ()=>{
    setGood(good + 1)
  }
  const handleNeutral = ()=>{
    setNeutral(neutral + 1)
  }
  const handleBad = ()=>{
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <br />
      <Button onClick={handleBad} text='Bad' />
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={handleGood} text='Good' />
      <br />
      <br />
      <br />
      <h2>Statistics</h2>
      <Display good={good} neutral={neutral} bad={bad} total={total} average={average} promedioGood={promedioGood} />
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
