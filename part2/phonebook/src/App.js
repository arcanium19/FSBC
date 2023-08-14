import React, { useState } from 'react'
import Search from './Search'
import AddNewNumber from './AddNewNumber'
import DisplayNumbers from './DisplayNumbers'
import {createNumber, updateNumber } from './actions'
import Notification from './Notification'
import './App.css'

const App = ({persons}) => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ filtered, setFiltered] = useState([])
  const [message, setMessage] = useState({})

  const handleName = (e)=>{
    setNewName(e.target.value)
  }

  const handleNumber = (e)=>{
    setNumber(e.target.value)
  }

  const handleSearch = (e)=>{
    setNewSearch(e.target.value)
    setFiltered(persons.filter(number=> number.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const sendAlert = persons.find(e => e.name === newName)
    if(sendAlert){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const response = await updateNumber(sendAlert.id,{name: newName, number: newNumber})
        console.log(response)
        if(response?.error?.includes('removed')){
          setNewName('')
          setNumber('')
          setMessage(`Information of ${newName} has already been removed from the server`)
        }
        if(response?.error){
          setNewName('')
          setNumber('')
          setMessage({error: `${response.error}`})
        }
        else{
          setNewName('')
          setNumber('')
          setMessage({message: `${newName} has been updated successfully`})
        }
        
      }
    }else{
      const response = await createNumber({name: newName, number: newNumber})
      // persons.push({name: newName, number: newNumber})
      // persons.push({name: newName})
      setNewName('')
      setNumber('')
      if(response?.error){
        setMessage({error: response.error})
      }else{
        setMessage({message: `${newName} has been added successfully`})
      }
    }
  }

  return (
    <div className='main-container'>
      <div className='header-container'>
        <h2><span>Phonebook</span></h2>
        <Search handleSearch={handleSearch} newSearch={newSearch} />
      </div>
      <Notification message={message} />
      <AddNewNumber handleName={handleName} handleNumber={handleNumber} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}/>
      <DisplayNumbers newSearch={newSearch ? filtered : persons} />
    </div>
  )
}

export default App
