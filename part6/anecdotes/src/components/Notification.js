import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notifications).message
  const time = useSelector((state) => state.notifications).time

  useEffect(() => {
    if (notification) {
      setTimeout(() => dispatch(resetNotification()), time)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return notification ? <div style={style}>{notification}</div> : null
}

export default Notification
