import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const { message, type } = useNotificationValue()

  return type ? (
    <div className={type} id='message'>
      {message}
    </div>
  ) : null
}

export default Notification
