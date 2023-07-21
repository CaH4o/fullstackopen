import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, time: 5000 }

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload
      return { ...state, message }
    },
    resetNotification(state) {
      return { ...state, message: null }
    },
  },
})

export const { setNotification, resetNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
