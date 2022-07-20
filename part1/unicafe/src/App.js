import { getAllByAltText } from '@testing-library/react'
import { useState } from 'react'

const Header = (props) => {
  return (<div>
   <h1>{props.header}</h1>
   </div>
   )
 }


 const Statistics = ({ good, neutral, bad }) => {
   const all = good + neutral + bad;
   const average = ((good - bad) / all) 
   const positive = ((good / all) * 100) 
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
      <table>
        <tbody>
      <StatisticLine text='good' counter={good} />
      <StatisticLine text='neutral' counter={neutral} />
      <StatisticLine text='bad' counter={bad} />
      <StatisticLine text='all' counter={all} />
      <StatisticLine text='average' counter={average} />
      <StatisticLine text='positive' counter={positive + '%'} />
        </tbody>
      </table>
      
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, counter}) => {
  return (
    <tr>
    <td>{text} </td>
    <td>{counter} </td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)
  const [average,setAvg] = useState(0)
  const [positive,setPos] = useState(0)

  const goodClick = () => {
   setAll(all+ 1)
   setGood(good + 1)
   setAvg(average+1)
   setPos(positive+1)
  }

  const neutralClick = () => {
    setAll(all+ 1)
    setNeutral(neutral + 1)
    setAvg(average)
  }

  const badClick = () => {
    setAll(all+ 1)
    setBad(bad + 1)
    setAvg(average-1)
  }
  
  return (
    <div>
      <Header header='give feedback' />
      <Button handleClick={goodClick} text='good' />
      <Button handleClick={neutralClick} text='neutral' />
      <Button handleClick={badClick} text='bad' />
      <Header header='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App