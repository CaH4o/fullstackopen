import { createSlice } from '@reduxjs/toolkit'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { type: null, message: null },
  reducers: {
    setMessage(state, { type, message }) {
      return { type, message }
    },
    clearNotification() {
      return { type: null, message: null }
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
