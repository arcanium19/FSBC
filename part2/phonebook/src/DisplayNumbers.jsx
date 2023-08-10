import React from 'react'
import NameList from './NameList'

const DisplayNumbers = ({newSearch}) => {
  return (
    <div className='mid-container'>
        <h2>Numbers</h2>
        {/* <div>debug: {newName}</div> */}
        <NameList numbers={newSearch} />
    </div>
  )
}

export default DisplayNumbers