// ---------------------- 1 -------------------------//
/*
import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

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

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
}) */

// ---------------------- 2 -------------------------//
/* 
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />) */

// ----------------------- 3 --------------------------//

import ReactDOM from 'react-dom/client'

import App from './App'
import { CounterContextProvider } from './CounterContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
)
