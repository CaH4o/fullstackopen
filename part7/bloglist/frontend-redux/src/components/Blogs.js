import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const showBlogs = blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        const message = error.response.data.error || 'Unexpected error'
        dispatch(setNotification({ type: 'error', message }))
      })
  }, [])

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat({ ...returnedBlog, user }))

      blogFormRef.current.toggleVisibility()

      const message = `a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`
      dispatch(setNotification({ type: 'create', message }))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setNotification({ type: 'error', message }))
    }
  }

  const updateBlog = async (updateBlog) => {
    try {
      const returnedBlog = await blogService.update(updateBlog)
      setBlogs(blogs.map((b) => (b.id === returnedBlog.id ? returnedBlog : b)))

      const message = `the blog '${returnedBlog.title}' by ${returnedBlog.author} is updated`
      dispatch(setNotification({ type: 'update', message }))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setNotification({ type: 'error', message }))
    }
  }

  const removeBlog = async (removeBlog) => {
    try {
      await blogService.remove(removeBlog.id)
      setBlogs(blogs.filter((b) => b.id !== removeBlog.id))

      const message = `the blog '${removeBlog.title}' by ${removeBlog.author} is removed`
      dispatch(setNotification({ type: 'remove', message }))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setNotification({ type: 'error', message }))
    }
  }

  return (
    <div>
      <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {showBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default Blogs
