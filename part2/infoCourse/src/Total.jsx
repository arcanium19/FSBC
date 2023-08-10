import React from 'react'

const Total = ({total}) => {
  const initial = 0;
  const totalSum = total.reduce((acc, current)=>acc + current.exercises, initial)
    
  return (
    <div>
        <p><b>Total of {totalSum} exercises.</b></p>
    </div>
  )
}

export default Total