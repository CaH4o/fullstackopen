import { useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, TextField, Button } from '@mui/material'

import { createComment } from '../../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')

  const handleCreateComment = async (event) => {
    event.preventDefault()
    const newComment = { title, blogId }
    dispatch(createComment(newComment))
    setTitle('')
  }

  return (
    <Stack
      component='form'
      onSubmit={handleCreateComment}
      sx={{ flexDirection: 'row', gap: '0.3rem' }}
    >
      <TextField
        size='small'
        label='Comment'
        id='title'
        type='text'
        value={title}
        name='Title'
        onChange={({ target }) => setTitle(target.value)}
      />
      <Button variant='outlined' size='small' color='primary' type='submit'>
        create
      </Button>
    </Stack>
  )
}

CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired,
}

export default CommentForm
