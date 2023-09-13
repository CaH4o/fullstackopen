import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

import NavBar from './components/NavBar'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token') || null
  )

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
      <NavBar logout={logout} token={token} />
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route
          path='/add'
          element={token ? <NewBook /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/*' element={<Navigate replace to='/authors' />} />
      </Routes>
    </>
  )
}

export default App
