import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
} from '@mui/material'

import { updateBlog, removeBlog } from '../../reducers/blogReducer'
import CommentForm from './CommentForm'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')

  const blogId = match.params.id
  const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === blogId))
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (!blog) {
      navigate('/blogs')
    }
  }, [blog])

  const updateLikes = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleRemoveBlog = () => {
    if (window.confirm('Do you really want to remove?')) {
      dispatch(removeBlog(blog))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <Stack sx={{ gap: '0.5rem' }}>
      <Typography variant='h5' component='h3'>
        {`${blog.title} by ${blog.author}`}
      </Typography>

      <Typography variant='body1'>
        {'URL: '} <a href={blog.url}>{blog.url}</a>
      </Typography>

      <Typography variant='body1'>
        {`Likes: ${blog.likes}`}{' '}
        <Button
          variant='outlined'
          size='small'
          color='primary'
          onClick={updateLikes}
        >
          like
        </Button>
      </Typography>

      <Typography variant='body1'>
        {`Created By: ${blog.user.name}`}{' '}
        <Button
          variant='outlined'
          size='small'
          color='primary'
          sx={{
            'display': user.username !== blog.user.username ? 'none' : '',
          }}
          onClick={handleRemoveBlog}
        >
          Remove
        </Button>
      </Typography>

      <Typography variant='h6' component='h4' sx={{ m: '0.5rem' }}>
        Comments:
      </Typography>

      <CommentForm blogId={blog.id} />

      <List>
        {blog.comments.map((c) => (
          <ListItem
            key={c.id}
            sx={{
              p: 0,
              marginLeft: 5,
              listStyleType: 'disc',
              display: 'list-item',
            }}
          >
            <ListItemText primary={c.title} sx={{ m: 0 }} />
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default Blog
