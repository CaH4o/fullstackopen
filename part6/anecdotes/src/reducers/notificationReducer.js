import { createSlice } from '@reduxjs/toolkit'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return null
    },
  },
})

export const { setMessage, clearNotification } = notificationsSlice.actions

export const setNotification = (message, time = 5000) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationsSlice.reducer
