import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Stack, TextField, Button } from '@mui/material'

import { login } from '../../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = { username, password }

    dispatch(login(credentials))

    setUsername('')
    setPassword('')
  }

  return (
    <Stack
      component='form'
      onSubmit={handleLogin}
      sx={{ gap: '0.3rem', width: 200 }}
    >
      <TextField
        size='small'
        label='Username'
        id='username'
        type='text'
        value={username}
        name='Username'
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextField
        size='small'
        label='Password'
        id='password'
        type='password'
        value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button variant='outlined' size='small' color='primary' type='submit'>
        login
      </Button>
    </Stack>
  )
}

export default LoginForm
