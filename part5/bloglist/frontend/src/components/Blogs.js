import { useState, useEffect, useRef } from 'react'

import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ user, setMessage }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  const showBlogs = blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        const text = error.response.data.error || 'Unexpected error'
        setMessage({ type: 'error', text })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat({ ...returnedBlog, user }))

      blogFormRef.current.toggleVisibility()
      setMessage({
        type: 'create',
        text: `a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`,
      })
    } catch (exception) {
      const text = exception.response.data.error || 'Unexpected error'
      setMessage({ type: 'error', text })
    }
  }

  const updateBlog = async (updateBlog) => {
    try {
      const returnedBlog = await blogService.update(updateBlog)
      setBlogs(blogs.map((b) => (b.id === returnedBlog.id ? returnedBlog : b)))

      setMessage({
        type: 'update',
        text: `the blog '${returnedBlog.title}' by ${returnedBlog.author} is updated`,
      })
    } catch (exception) {
      const text = exception.response.data.error || 'Unexpected error'
      setMessage({ type: 'error', text })
    }
  }

  const removeBlog = async (removeBlog) => {
    try {
      await blogService.remove(removeBlog.id)
      setBlogs(blogs.filter((b) => b.id !== removeBlog.id))

      setMessage({
        type: 'remove',
        text: `the blog '${removeBlog.title}' by ${removeBlog.author} is removed`,
      })
    } catch (exception) {
      const text = exception.response.data.error || 'Unexpected error'
      setMessage({ type: 'error', text })
    }
  }

  return (
    <div>
      <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} setMessage={setMessage} />
      </Togglable>
      {showBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}
export default Blogs
