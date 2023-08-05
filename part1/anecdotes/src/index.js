import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Button from './Button';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const [mostVoted, setMostVoted] = useState({
    votes: 0,
    text: 'If it hurts, do it more often',
  });

  const handleRandom = () => {
    const countAll = anecdotes.length;
    const setRandom = Math.floor(Math.random() * countAll);
    setSelected(setRandom);
  };

  const handleVotes = () => {
    setVotes({
      ...votes,
      [selected]: votes[selected] + 1,
    });
  };

  useEffect(() => {
    const maxValue = Math.max(...Object.values(votes));
    const maxKey = Object.keys(votes).find((key) => votes[key] === maxValue);

    setMostVoted({
      votes: maxValue,
      text: props.anecdotes[maxKey],
    });
  }, [votes, props.anecdotes]);

  return (
    <div>
      <h1>Anecdotes of the day:</h1>
      <h2>{props.anecdotes[selected]}</h2>
      <h3>has {votes[selected]} votes.</h3>
      <Button onClick={handleVotes} text='Vote' />
      <Button onClick={handleRandom} text='Next anecdote' />
      <h1>anecdotes with most votes:</h1>
      <h2>{mostVoted.text}</h2>
      <h3>has {mostVoted.votes} votes</h3>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
