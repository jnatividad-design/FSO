const Header = (props) => {
 return (<div>
  <h1>{props.course}</h1>
  </div>
  )
}

const Part = (props) => {
  return (
    <>
    <p>{props.part} {props.exercise}</p>
    </>
  )
}
const Content = (props) => {
 return (
 <div>
    <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
    <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
    <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
  </div>
 )
}


const Total = (props) => {
 return ( <div>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </div>
 )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )
  }
  export default App

  //Code not being used
  // const App = () => {
    
    //   const course = 'Half Stack application development'
    //   const part1 = 'Fundamentals of React'
    //   const exercises1 = 10
    //   const part2 = 'Using props to pass data'
    //   const exercises2 = 7
    //   const part3 = 'State of a component'
    //   const exercises3 = 14
    
    //   return (
      //     <>
      //       <Header course={course} />
//       <Content 
//       part1={part1} exercises1={exercises1}
//       part2={part2} exercises2={exercises2}
//       part3={part3} exercises3={exercises3}
//       />
//       <Total exercise1={exercises1} exercise2={exercises2}exercise3={exercises3}/>
//     </>
//   )
// }
// <>
//    <Header course={course} />
//    <Content 
//    part1={parts[0].name} exercises1={parts[0].exercises}
//    part2={parts[1].name} exercises2={parts[1].exercises}       part3={parts[2].name} exercises3={parts[2].exercises}
//    />
//    <Total exercise1={parts[0].exercises} exercise2={parts[1].exercises}exercise3={parts[2].exercises}/>
//  </>
