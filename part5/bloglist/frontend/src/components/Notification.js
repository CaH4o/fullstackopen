import React, { useEffect } from 'react'

const Notification = ({ message, setMessage }) => {
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(null), 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return message ? <div className={message.type} id='message'>{message.text}</div> : null
}

export default Notification
