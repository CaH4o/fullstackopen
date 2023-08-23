import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogReducer'
import userReducer, { localStorageAppUser } from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const user = JSON.parse(window.localStorage.getItem(localStorageAppUser)) || {
  name: '',
  username: '',
  token: null,
}

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
  preloadedState: {
    user,
  },
})

export default store
