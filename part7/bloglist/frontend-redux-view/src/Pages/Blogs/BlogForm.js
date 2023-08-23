import { useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, TextField, Button, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const secureUrl = url.replace(/['"`]/g, '')
    const newBlog = { title, author, url: secureUrl }

    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Stack
      component='form'
      onSubmit={handleCreateBlog}
      sx={{ flexDirection: 'row', justifyContent: 'center', gap: '0.3rem' }}
    >
      <Typography variant='h5'>Add a blog:</Typography>
      <TextField
        size='small'
        label='Title'
        id='title'
        type='text'
        value={title}
        name='Title'
        onChange={({ target }) => setTitle(target.value)}
      />
      <TextField
        size='small'
        label='Author'
        id='author'
        type='text'
        value={author}
        name='Author'
        onChange={({ target }) => setAuthor(target.value)}
      />
      <TextField
        size='small'
        label='URL'
        id='url'
        type='text'
        value={url}
        name='url'
        onChange={({ target }) => setUrl(target.value)}
      />
      <Button variant='outlined' size='small' color='primary' type='submit'>
        create
      </Button>
    </Stack>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
