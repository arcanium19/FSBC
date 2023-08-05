import React from 'react'

const Total = (props) => {
    let suma = 0;
    props.total.forEach(e => {
        suma = suma+e.exercises
    })
  return (
    <div>
        <p>Number of exercises {suma}</p>
    </div>
  )
}

export default Total