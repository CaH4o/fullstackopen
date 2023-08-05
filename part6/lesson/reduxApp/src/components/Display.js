// ---------------------- 2_3 -------------------------//
/*
import { useContext } from 'react'

import CounterContext from '../CounterContext'

const Display = () => {
  // eslint-disable-next-line no-unused-vars
  const [counter, dispatch] = useContext(CounterContext)
  return <div>{counter}</div>
}

export default Display */

// ----------------------- 3 --------------------------//

import { useCounterValue } from '../CounterContext'

const Display = () => {
  const counter = useCounterValue()
  return <div>{counter}</div>
}

export default Display
