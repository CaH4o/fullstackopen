import { createSlice } from '@reduxjs/toolkit'

import usersService from '../services/users'
import { setMessage } from './notificationReducer'

const initialState = []

const userSlicer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const users = action.payload
      return users
    },
  },
})

export const { setUsers } = userSlicer.actions

export const initialazeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll()
      dispatch(setUsers(users))
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setMessage(message))
    }
  }
}

export default userSlicer.reducer
