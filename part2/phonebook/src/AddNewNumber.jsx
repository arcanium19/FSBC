import React from 'react'

const AddNewNumber = ({handleName, handleNumber, handleSubmit, newName, newNumber}) => {
  return (
    <div className='mid-container'>
        <h2>Add a new</h2>
        <form onSubmit={handleSubmit}>
            <div className='list'>
            <h6>name</h6><input onChange={handleName} value={newName} />
            </div>
            <div className='list'>
            <h6>number</h6><input onChange={handleNumber} value={newNumber} />
            </div>
            <button type="submit" className='btn'>add</button>
        </form>
    </div>
  )
}

export default AddNewNumber