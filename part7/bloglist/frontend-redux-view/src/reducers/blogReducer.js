import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import commentService from '../services/comment'
import { setMessage, types } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'Blogs',
  initialState,
  reducers: {
    setBlogs: function (state, action) {
      const blogs = action.payload
      return blogs
    },
    appendBlog: function (state, action) {
      const blogs = state
      const blog = action.payload
      return blogs.concat(blog)
    },
    mapBlog: function (state, action) {
      const blogs = state
      const blog = action.payload
      return blogs.map((b) => (b.id !== blog.id ? b : blog))
    },
    filterBlog: function (state, action) {
      const blogs = state
      const blog = action.payload
      return blogs.filter((b) => b.id !== blog.id)
    },
    appendComment: function (state, action) {
      const blogs = state
      const comment = action.payload
      return blogs.map((b) =>
        b.id !== comment.blog
          ? b
          : { ...b, comments: b.comments.concat(comment) }
      )
    },
  },
})

export const { setBlogs, appendBlog, mapBlog, filterBlog, appendComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setMessage(message))
    }
  }
}

export const createBlog = ({ blog, user }) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog)
      dispatch(appendBlog({ ...createdBlog, user }))

      const message = `a new blog '${createdBlog.title}' by ${createdBlog.author} added`
      dispatch(setMessage(message, types.create))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setMessage(message))
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch(mapBlog(updatedBlog))

      const message = `the blog '${blog.title}' by ${blog.author} is updated`
      dispatch(setMessage(message, types.update))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setMessage(message))
    }
  }
}

export const removeBlog = (removeBlog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(removeBlog.id)
      dispatch(filterBlog(removeBlog))

      const message = `the blog '${removeBlog.title}' by ${removeBlog.author} is removed`
      dispatch(setMessage(message, types.remove))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setMessage(message))
    }
  }
}

export const createComment = (comment) => {
  return async (dispatch) => {
    try {
      const createdComment = await commentService.create(comment)
      dispatch(appendComment(createdComment))

      const message = `a new comment '${createdComment.title}' added`
      dispatch(setMessage(message, types.create))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setMessage(message))
    }
  }
}

export default blogSlice.reducer
