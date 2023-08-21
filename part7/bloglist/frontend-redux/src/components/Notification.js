import { useSelector } from 'react-redux'

const Notification = () => {
  const { type, message } = useSelector((state) => state.notifications)

  return message ? (
    <div className={type} id='message'>
      {message}
    </div>
  ) : null
}

export default Notification
