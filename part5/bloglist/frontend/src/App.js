import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import Notification from './components/Notification'

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

  return user ? (
    <div>
      <h2>blogs</h2>
      <Notification message={message} setMessage={setMessage} />
      <Logout user={user} setUser={setUser} />
      <Blogs setMessage={setMessage} />
    </div>
  ) : (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} setMessage={setMessage} />
      <Login setUser={setUser} setMessage={setMessage} />
    </div>
  )
}

export default App
