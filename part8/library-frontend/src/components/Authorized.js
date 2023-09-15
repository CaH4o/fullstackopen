import { Outlet } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { USER } from '../queries'

const Authorized = ({ user, setUser }) => {
  const result = useQuery(USER, {
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      console.log(messages)
    },
    onCompleted: (result) => {
      setUser(result.me)
    },
  })

  return result.loading || !user ? <div>loading...</div> : <Outlet />
}
export default Authorized
