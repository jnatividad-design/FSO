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
<li>{country} <button onClick={handleClick}>show</button>
    {state && <CountryInfo country={country} />}
</li>
  )}

const Language = ({language}) => {
  return (
    <li> {language} </li>
  )
}
  const CountryInfo = ({ country }) => (
    <div>
      <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
      <h2>languages</h2>
        {/* <ul>
          {country.languages.map(language =>
            <Language key={language.name} language={language.name} />
          )}
        </ul> */}
      <img src={country.flag} width="33%" height="33%" />
      {/* <Weather capital={country.capital} /> */}
    </div>
  )

const Result = (props) => {
  const {countries, newFilter,} = props
  
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
        <div>
          {
            countries.map(e => {
              return (
                <div key={e.name}>
                  <Country country={e.name}/>
                </div>
              )
            })
          }
        </div>
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
