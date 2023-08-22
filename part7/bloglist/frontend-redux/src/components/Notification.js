import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  return type ? (
    <div className={type} id='message'>
      {message}
    </div>
  ) : null
}

export default Notification
