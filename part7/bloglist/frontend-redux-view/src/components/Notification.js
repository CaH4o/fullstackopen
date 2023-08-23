import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  return type ? <Alert severity={type}>{message}</Alert> : null
}

export default Notification
