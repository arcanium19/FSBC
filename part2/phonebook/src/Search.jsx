import React from 'react'

const Search = ({handleSearch, newSearch}) => {
  return (
    <div className='search-bar'>
        <p>Filter shown with</p>
        <input onChange={handleSearch} value={newSearch} />
    </div>
  )
}

export default Search