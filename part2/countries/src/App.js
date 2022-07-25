import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return(
<li>{country.name}</li>
  )}

const Result = (props) => {
  const {countries, newFilter,} = props
  
  if(newFilter) {
    if (countries.length === 1) {
      return (
        <div>
        <Country country={countries[0]} />
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
                  <Country country={e}/>
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
    const [showCountries, setShowCountries] = useState(true)


    useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all').then(response => {
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
      
      
    //Other filter array I was working with 
    //   let value = ''
    //   if (event.target.value.length > 0) {
    //     value = event.target.value
    //   }
    //   setNewFilter(value)
    // }

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
