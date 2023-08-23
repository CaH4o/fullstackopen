import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: null }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      const { message, type } = action.payload
      const newNotification = { message, type }
      return newNotification
    },
    clearNotification() {
      return initialState
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const types = {
  error: 'error',
  create: 'success',
  login: 'info',
  update: 'success',
  remove: 'warning',
}

export const setMessage = (message, type = types.error, time = 5000) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer
