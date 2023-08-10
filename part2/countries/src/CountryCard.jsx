import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryCard = ({name, flag, capital, languages, population}) => {
    const [weather, setWeather] = useState(null);
    const lang = []
    for(let key in languages){
        lang.push(languages[key])
    }
    const api_key = process.env.REACT_APP_KEY_WEATHER

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
          .then(response => {
            setWeather(response.data);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      }, [capital, api_key]);

      console.log(weather)
    return (
        <div>
            <h1>{name}</h1>
            <p>capital: {capital}</p>
            <p>population: {population}</p>
            <h3>Spoken languages</h3>
            <ul>
                {
                    lang.map(e=><li key={`${e}-lang-${name}`}>{e}</li>)
                }
            </ul>
            <img src={flag} width={150} alt={`flag-${name}`} />
            {weather && (
                <div>
                <h3>Weather in {capital}</h3>
                <p>Temperature: {weather?.current?.temperature} °C</p>
                <img src={weather?.current?.weather_icons} alt="iconWeather" />
                <p>Wind: {weather?.wind_speed} mph direction {weather?.wind_dir}</p>
                </div>
            )}

        </div>
    )
}

export default CountryCard