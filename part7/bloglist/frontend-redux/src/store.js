import { configureStore } from '@reduxjs/toolkit'

import notificationsSlice from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notifications: notificationsSlice,
  },
})

export default store
