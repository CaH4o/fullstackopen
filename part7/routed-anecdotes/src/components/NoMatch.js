import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NoMatch = () => {
  const [seconds, setSeconds] = useState(5)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds(seconds - 1)
    }, 1000)

    if (seconds < 1) navigate('/')

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  return (
    <div>
      <h3>
        No match for path: <code>{location.pathname}</code>
      </h3>
      <br />
      <div>
        You will be redirect to home page in <b>{seconds} seconds</b>
      </div>
    </div>
  )
}
export default NoMatch
