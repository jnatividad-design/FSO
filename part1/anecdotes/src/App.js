import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

const Header = (props) => {
  return (<div>
   <h1>{props.header}</h1>
   </div>
   )
 }

const Button = ({ handleClick, text }) => (
  <>
  <button onClick={handleClick}>
    {text}
  </button>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const setClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const anecdoteMax = points.indexOf(Math.max(...points));
  
  
  const pointClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  }

  const StatisticLine = ({text, counter}) => {
    return (
      <>
      <p>{text} {counter}</p>
      </>
    )
  }

  return (
    <div>
      <Header header='Anecdote of the Day' />
      {anecdotes[selected]}
      <StatisticLine text='Votes:' counter={points[selected]} />
      <Button text='Vote' handleClick={pointClick}/>
      <Button text='Random Anecdote' handleClick={setClick}/>
      <Header header='Anecdote with the most votes' />
      <p>{anecdotes[anecdoteMax]}</p>
    </div>
  )
}

export default App