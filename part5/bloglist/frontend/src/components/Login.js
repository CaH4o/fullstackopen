import { useState } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = { username, password }
      const user = await loginService.login(credentials)

      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setMessage({
        type: 'login',
        text: `succesful login as ${user.name}`,
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      const text = exception.response.data.error || 'Unexpected error'
      setMessage({ type: 'error', text })
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default Login
