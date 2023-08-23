import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'

import { autoLogin, logout } from '../reducers/userReducer'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const path = location.pathname.split('/')[1]

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  useEffect(() => {
    if (user.token) navigate(path ? `/${path}` : '/blogs')
  }, [user])

  useEffect(() => {
    if (notification.message === 'token expired') {
      handleLogout()
    }
  }, [notification])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button color='inherit' component={Link} to='/blogs'>
            Blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
        </Box>

        {user.token ? (
          <Box>
            <Typography variant='em' component='em' sx={{ flexGrow: 1 }}>
              {user.name} logged in
            </Typography>
            <Button color='inherit' onClick={handleLogout}>
              logout
            </Button>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
