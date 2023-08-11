import { useEffect } from 'react'

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    if (notification !== '') {
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return notification !== '' ? <div style={style}>{notification}</div> : null
}
export default Notification
