import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'

import NavBar from './components/NavBar'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import RecommendedBook from './components/RecommendedBook'
import LoginForm from './components/LoginForm'
import Authorized from './components/Authorized'
import { BOOK_ADDED, ALL_BOOKS, ALL_BOOKS_BY_GENER } from './queries'
import { uniqByTitle } from './utils/index'

const App = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token') || null
  )

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, (props) => {
        if (props) {
          return {
            allBooks: uniqByTitle(props.allBooks.concat(addedBook)),
          }
        }
      })

      if (user && addedBook.genres.some((g) => g === user.favoriteGenre)) {
        client.cache.updateQuery(
          {
            query: ALL_BOOKS_BY_GENER,
            variables: { genre: user.favoriteGenre },
          },
          (props) => {
            if (props) {
              return {
                allBooks: uniqByTitle(props.allBooks.concat(addedBook)),
              }
            }
          }
        )
      }
    },
  })

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
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route
          path='/'
          element={
            token ? (
              <Authorized setUser={setUser} user={user} />
            ) : (
              <Navigate replace to='/login' />
            )
          }
        >
          <Route path='add' element={<NewBook user={user} />} />
          <Route path='recommended' element={<RecommendedBook user={user} />} />
          <Route path='' element={<Navigate replace to='/authors' />} />
          <Route path='*' element={<Navigate replace to='/authors' />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
