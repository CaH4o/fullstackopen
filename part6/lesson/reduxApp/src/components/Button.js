// ---------------------- 2_3 -------------------------//
/*
import { useContext } from 'react'

import CounterContext from '../CounterContext'

const Button = ({ type, label }) => {
  // eslint-disable-next-line no-unused-vars
  const [counter, dispatch] = useContext(CounterContext)
  return <button onClick={() => dispatch({ type })}>{label}</button>
}

export default Button */

// ----------------------- 3 --------------------------//

import { useCounterDispatch } from '../CounterContext'

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch()
  return <button onClick={() => dispatch({ type })}>{label}</button>
}

export default Button
