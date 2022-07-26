import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [ state, setState ] = useState(false)
  
  const handleClick = () => {
    setState(!state)
  } 

  return(
<li>{country} <button>show</button>
    {/* {state && <CountryInfo country={country} />} */}
</li>
  )}

const Language = ({language}) => {
  return (
    <li> {language} </li>
  )
}


  const CountryInfo = ({ country }) => {
    const [weather,setWeather] = useState([])

    const api_key = process.env.REACT_APP_API_KEY
    const weather_api = (`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=imperial`)

    useEffect (() => {
      axios
      .get(weather_api)
      .then(response => {
        setWeather([response.data])
      })
    })

    if (weather.length > 0) {
      const currentWeather = weather[0]
      const weatherIcon = weather.weather.icon[0]
      console.log(weatherIcon)
      return (
        <div>
          <h1>{country.name}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h2>Spoken languages</h2>
          <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={country.flag} width="33%" height="33%" alt="Country flag"></img>
          <h2>Weather in {country.capital}</h2>
          <p>temperature: {currentWeather.main.temp}° Fahrenheit</p>
          <img src={currentWeather.weather.icon} alt="Weather icon"></img>
          <p>wind: {currentWeather.wind.speed} mph direction {currentWeather.wind.deg}</p>
        </div>
      )
    }
    
    
    return (
    <div>
      <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
      <h2>languages</h2>
        <ul>
          {country.languages.map(language =>
            <Language key={language.name} language={language.name} />
          )}
        </ul>
      <img src={country.flag} width="33%" height="33%" />
      {/* <Weather capital={country.capital} /> */}
    </div>
  )
 }
const Result = (props) => {
  const {countries, newFilter,setCountries,} = props
  
  if(newFilter) {
    if (countries.length === 1) {
      return (
        <div>
        <CountryInfo country={countries[0]} />
      </div>
      )
    }
    else if (countries.length >= 2 && countries.length <= 10) {
      return (
      <ul>
          {countries.map((country, i) =>
            <li key={i}> {country.name} <button onClick={() => setCountries([country])}>show</button></li>
          )}
        </ul>
      )
  }else if (countries.length > 10) {
    return (
      <div> Too many matches, specify another filter</div>
    )
  }
}

return (<div></div>)
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')
    

    useEffect(() => {
      axios.get('https://restcountries.com/v2/all').then(response => {
        setCountries(response.data)
      })
    }, [])
    console.log('render',countries.length,'countries')

    const handleFilterSubmit = (event) => {
      console.log(event.target.value)
      setNewFilter(event.target.value)
      const regex = new RegExp ( newFilter, 'i');
      const filteredCountries = () => countries.filter(country => country.name.match(regex));
      setCountries(filteredCountries)
    }

  return (
    <div>
      <div>
        Find Countries <input value={newFilter} onChange={handleFilterSubmit} />
      </div>
      <ul>
        <Result countries={countries} setCountries={setCountries} newFilter={newFilter}/>
      </ul>
    </div>
  );
}

export default App;
