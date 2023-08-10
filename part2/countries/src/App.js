import React, { useState } from 'react';
import './App.css';
import DisplayCountry from './DisplayCountry';

function App({countries}) {

  const [newSearch, setNewSearch] = useState('');
  const [countriesFiltered, setCountriesFiltered] = useState([])
  

  const handleSearch = (e)=>{
    setNewSearch(e.target.value)
    setCountriesFiltered(countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div>
      Search country: <input onChange={handleSearch} value={newSearch} />
      <DisplayCountry results={countriesFiltered} />
    </div>
  );
}

export default App;
