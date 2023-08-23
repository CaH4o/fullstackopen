import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

const User = () => {
  const navigate = useNavigate()
  const match = useMatch('/users/:id')
  const userId = match.params.id
  const singlUser = useSelector(({ users }) =>
    users.find((u) => u.id === userId)
  )

  useEffect(() => {
    if (!singlUser) {
      navigate('/users')
    }
  }, [singlUser])

  return singlUser ? (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant='h5' component='h3'>
        {singlUser.name}
      </Typography>
      <h3></h3>
      <Typography variant='h6' component='h4'>
        Added blogs:
      </Typography>
      <List>
        {singlUser.blogs.map((blog) => (
          <ListItem
            key={blog.id}
            sx={{
              p: 0,
              marginLeft: 5,
              listStyleType: 'disc',
              display: 'list-item',
            }}
          >
            <ListItemText primary={blog.title} sx={{ m: 0 }} />
          </ListItem>
        ))}
      </List>
    </div>
  ) : null
}
export default User
