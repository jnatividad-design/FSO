import React from 'react'

const Total = ({ sum }) => {
    const total = sum.reduce((sum, parts) => sum + parts.exercises,0)
    return (
  <p>Number of exercises {total}</p>
    )
  }

  export default Total