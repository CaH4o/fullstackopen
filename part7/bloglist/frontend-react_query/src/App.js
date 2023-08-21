import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(null), 3000)

      if (message.text === 'token expired') {
        logout()
      }
    }
  }, [message])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>

      <Notification message={message} />

      {user && (
        <div>
          <div>
            {`${user.name} logged in `}
            <button onClick={logout}>logout</button>
          </div>
          <Blogs user={user} setMessage={setMessage} />{' '}
        </div>
      )}

      {!user && (
        <Togglable buttonLabel='to login'>
          <Login setUser={setUser} setMessage={setMessage} />
        </Togglable>
      )}
    </div>
  )
}

export default App
