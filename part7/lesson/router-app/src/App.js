// ======================= 2 ======================= //
/* 
import { useState } from 'react'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'

import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'

const App = () => {
  const [notes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ])

  const [user, setUser] = useState(null)

  const match = useMatch('/notes/:id')

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
  }

  return (
    <div>
      <NavBar user={user} />
      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <div>
        <br />
        <em>Note app, Department of Computer Science 2022</em>
      </div>
    </div>
  )
}

export default App */

// ======================= 3 ======================= //
/* 
import { useState } from 'react'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'

const App = () => {
  const [notes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const match = useMatch('/notes/:id')

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  return (
    <div className='container'>
      {message && <Alert variant='success'>{message}</Alert>}
      <NavBar user={user} />
      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <div>
        <br />
        <em>Note app, Department of Computer Science 2022</em>
      </div>
    </div>
  )
}

export default App */

// ======================= 4 ======================= //
/* 
import { useState } from 'react'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import { Container, Alert } from '@mui/material'

import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'

const App = () => {
  const [notes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const match = useMatch('/notes/:id')

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  return (
    <Container>
      {message && <Alert severity='success'>{message}</Alert>}
      <NavBar user={user} />
      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <div>
        <br />
        <em>Note app, Department of Computer Science 2022</em>
      </div>
    </Container>
  )
}

export default App */

// ======================= 5 ======================= //

import { useState } from 'react'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import styled from 'styled-components'

import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const App = () => {
  const [notes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ])

  const [user, setUser] = useState(null)

  const match = useMatch('/notes/:id')

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
  }

  return (
    <Page>
      <NavBar user={user} />
      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer>
        <br />
        <em>Note app, Department of Computer Science 2022</em>
      </Footer>
    </Page>
  )
}

export default App
