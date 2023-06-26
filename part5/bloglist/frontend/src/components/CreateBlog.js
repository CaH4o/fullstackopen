import { useState } from 'react'

import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = { title, author, url }
      const returnedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, returnedBlog])

      setMessage({
        type: 'create',
        text: `a new blog '${title}' by ${author} added`,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      const text = exception.response.data.error || 'Unexpected error'
      setMessage({ type: 'error', text })
    }
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default CreateBlog
