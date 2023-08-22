import { useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { useSetNotification, types } from '../NotificationContext'
import { useUserValue } from '../UserContext'
import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const blogFormRef = useRef()
  const setNotification = useSetNotification()
  const queryClient = useQueryClient()
  const user = useUserValue()

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat({ ...newBlog, user }))

      const message = `a new blog '${newBlog.title}' by ${newBlog.author} added`
      setNotification(message, types.create)
    },
    onError: ({ response }) => {
      const message = response.data.error || 'Unexpected error'
      setNotification(message)
    },
  })

  const addBlog = async (newBlog) => {
    await newBlogMutation.mutate(newBlog)
    blogFormRef.current.toggleVisibility()
  }

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )

      const message = `the blog '${updatedBlog.title}' by ${updatedBlog.author} is updated`
      setNotification(message, types.update)
    },
    onError: ({ response }) => {
      const message = response.data.error || 'Unexpected error'
      setNotification(message)
    },
  })

  const updateBlog = async (updateBlog) => {
    await updateBlogMutation.mutate(updateBlog)
  }

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: (response, removeBlogId) => {
      const blogs = queryClient.getQueryData('blogs')
      const removeBlog = blogs.find((b) => b.id === removeBlogId)
      queryClient.setQueryData(
        'blogs',
        blogs.filter((blog) => blog.id !== removeBlogId)
      )

      const message = `the blog '${removeBlog.title}' by ${removeBlog.author} is removed`
      setNotification(message, types.remove)
    },
    onError: ({ response }) => {
      const message = response.data.error || 'Unexpected error'
      setNotification(message)
    },
  })

  const removeBlog = async (removeBlog) => {
    await removeBlogMutation.mutate(removeBlog.id)
  }

  const result = useQuery('blogs', blogService.getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  const showBlogs = result.isSuccess
    ? result.data.sort((a, b) => b.likes - a.likes)
    : []

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    const message = result.error.response.data.error || 'Unexpected error'
    setNotification(message)
    return <div>anecdote service not available due to problem in server</div>
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

export default Blogs
