import React from 'react'
import CountryCard from './CountryCard'
import ShowContainer from './ShowContainer'

const DisplayCountry = ({results}) => {


    if(results.length > 10){
        return (
            <div><h4>Too many matches, specify another filter</h4></div>
        )
    }
    if(results.length === 1){
        return (
            <CountryCard
                name={results[0].name.common}
                flag={results[0].flags.png} 
                capital={results[0].capital} 
                languages={results[0].languages} 
                population={results[0].population}
            />
        )
    }
    if(results.length > 1 && results.length<=10){
        return (
            <div>
                {
                    results.map(country => <ShowContainer country={country} key={country.name.common} />)
                }
            </div>
        )
    }
    if(results.length === 0){
        return (
            <div><p>Search a country...</p></div>
        )
    }

}

export default DisplayCountry