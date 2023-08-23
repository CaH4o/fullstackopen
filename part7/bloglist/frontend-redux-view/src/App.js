import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container, Typography } from '@mui/material'

import BlogsPage from './Pages/Blogs'
import SinglBlogPage from './Pages/Blogs/Blog'
import UsersPage from './Pages/Users'
import SingleUserPage from './Pages/Users/User'
import LoginPage from './Pages/Login'
import Notification from './components/Notification'
import NavBar from './components/NavBar'

const App = () => {
  const user = useSelector((state) => state.user)

  return (
    <Container>
      <NavBar />
      <Notification />
      <Typography sx={{ mt: 4, mb: 2 }} variant='h4' component='h2'>
        {user.token ? 'Blogs application' : 'Log in to application'}
      </Typography>
      <Routes>
        <Route path='/users/:id' element={<SingleUserPage />} />
        <Route
          path='/users'
          element={user.token ? <UsersPage /> : <Navigate replace to='/' />}
        />
        <Route path='/blogs/:id' element={<SinglBlogPage />} />
        <Route
          path='/blogs'
          element={user.token ? <BlogsPage /> : <Navigate replace to='/' />}
        />
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </Container>
  )
}

export default App
