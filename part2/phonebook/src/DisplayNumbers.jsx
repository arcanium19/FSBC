import React from 'react'
import NameList from './NameList'

const DisplayNumbers = ({newSearch}) => {
  return (
    <div className='mid-container'>
        <h2>Numbers</h2>
        {/* <div>debug: {newName}</div> */}
        {newSearch.length > 0 ? <NameList numbers={newSearch} /> : <p>No item found</p>}
    </div>
  )
}

export default DisplayNumbers