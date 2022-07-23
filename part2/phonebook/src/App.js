import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Header from './components/Header'

const App = () => {
  const [persons, setPersons] = useState( [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    setNewNumber(persons.concat(personObject))
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  }

  //To check if array has something in it
  const isFound = persons.some(element => {
    if (element.name === newName) {
      return true;
    }

    return false;
  });


  const handleNameSubmit = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberSubmit = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterSubmit = (event) => {
    console.log(event.target.value)
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
          <Person key={person.id} person={person} number={person}/>
          )}
      </ul>
    </div>
  )
}

export default App;
