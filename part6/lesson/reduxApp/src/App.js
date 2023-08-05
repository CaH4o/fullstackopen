// ---------------------- 2_1 -------------------------//
/*
import React, { useReducer } from 'react'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={(e) => counterDispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={(e) => counterDispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={(e) => counterDispatch({ type: 'ZERO' })}>0</button>
    </div>
  )
}

export default App */

// ---------------------- 2_2 -------------------------//
/*
import React, { useReducer } from 'react'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const Display = ({ counter }) => {
  return <div>{counter}</div>
}

const Button = ({ dispatch, type, label }) => {
  return <button onClick={() => dispatch({ type })}>{label}</button>
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <div>
      <Display counter={counter} />
      <div>
        <Button dispatch={counterDispatch} type='INC' label='+' />
        <Button dispatch={counterDispatch} type='DEC' label='-' />
        <Button dispatch={counterDispatch} type='ZERO' label='0' />
      </div>
    </div>
  )
}

export default App*/

// ---------------------- 2_3 -------------------------//
/*
import React, { useReducer } from 'react'

import CounterContext from './CounterContext'
import Button from './components/Button'
import Display from './components/Display'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </CounterContext.Provider>
  )
}

export default App*/

// ----------------------- 3 --------------------------//

import Display from './components/Display'
import Button from './components/Button'

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
  )
}

export default App
