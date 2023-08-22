import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import loginService from '../services/login'
import { setMessage, types } from './notificationReducer'

const initialState = { name: '', username: '', token: null }

const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: function (state, action) {
      const user = action.payload
      return user
    },
    clearUser: function () {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userSlicer.actions

const localStorageAppUser = 'loggedBlogAppUser'

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)

      dispatch(setUser(user))
      window.localStorage.setItem(localStorageAppUser, JSON.stringify(user))
      blogService.setToken(user.token)

      const message = `succesful login as ${user.name}`
      dispatch(setMessage(message, types.login))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setMessage(message))
    }
  }
}

export const autoLogin = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem(localStorageAppUser)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem(localStorageAppUser)
    blogService.setToken(null)
    dispatch(clearUser())
  }
}

export default userSlicer.reducer
