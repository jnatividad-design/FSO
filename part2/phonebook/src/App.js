import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import Header from './components/Header'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    
    if (isFound) {
      console.log(`✅ array already contains object with name ${newName}`);
      alert(`${newName} is already added to the phonebook`)
    }
   else {const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
   }
   personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewNumber(persons.concat(response.data))
        setNewNumber('')
        setNewName('')
      })
  }
  }


  //Delete current contact entry button
  const buttonDeleteof = id => {
    const person = persons.find(n => n.id === id )
    const personName = person.name
    console.log( id + ' ' + 'needs to be deleted')
    window.confirm(`Are you sure you want to delete ${personName}?`)
  }

  //To check if array has something in it
  const isFound = persons.some(element => {
    if (element.name === newName) {
      return true;
    }
    return false;
  });

  const handleNameSubmit = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberSubmit = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterSubmit = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)
    const regex = new RegExp ( newFilter, 'i');
    const filteredPersons = () => persons.filter(person => person.name.match(regex))
    setPersons(filteredPersons)
  }
  
  return (
    <div>
      <Header title='Phonebook' />
      <Filter value={newFilter} onChange={handleFilterSubmit} />
      <Header title='Add a number' />
      <form onSubmit={addPerson}>
        <div> debug: {newName}</div>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameSubmit}
          />
        </div>
        <div>
          number: <input 
          value={newNumber} 
          onChange={handleNumberSubmit}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <Header title='Numbers' />
      <ul>
        {persons.map( person =>
          <Person 
          key={person.id} 
          person={person} 
          number={person}
          deletePerson={ () => buttonDeleteof(person.id)}/>
          )}
          
      </ul>
    </div>
  )
}


export default App;
