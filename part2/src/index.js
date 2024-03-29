import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import axios from 'axios'
import './index.css'

axios
.get('http://localhost:3001/notes')
.then(response => {
  const notes = response.data
  console.log(notes)
})

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

const result = notes.map(note =>
  <li key={note.id}>{note.content}</li>
)
console.log(result)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)