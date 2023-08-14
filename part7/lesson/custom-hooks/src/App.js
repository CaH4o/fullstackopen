// =========================== 1 =========================== //
/*
import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>plus</button>
      <button onClick={() => setCounter(counter - 1)}>minus</button>
      <button onClick={() => setCounter(0)}>zero</button>
    </div>
  )
}

export default App */

// =========================== 2 =========================== //
/*
import useCounter from './hooks/useCounter'

const App = () => {
  const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>plus</button>
      <button onClick={counter.decrease}>minus</button>
      <button onClick={counter.zero}>zero</button>
    </div>
  )
}

export default App */

// =========================== 3 =========================== //
/* 
import useCounter from './hooks/useCounter'

const App = () => {
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      {left.value}
      <button onClick={left.increase}>
        left
      </button>
      <button onClick={right.increase}>
        right
      </button>
      {right.value}
    </div>
  )
}

export default App */

// =========================== 4 =========================== //
/*
import { useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [height, setHeight] = useState('')

  return (
    <div>
      <form>
        name:
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        birthdate:
        <input
          type='date'
          value={born}
          onChange={(event) => setBorn(event.target.value)}
        />
        <br />
        height:
        <input
          type='number'
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
      </form>
      <div>
        {name} {born} {height}
      </div>
    </div>
  )
}

export default App */

// =========================== 5 =========================== //
/*
import { useField } from './hooks'

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        <input type={name.type} value={name.value} onChange={name.onChange} />
        <br />
        birthdate:
        <input type={born.type} value={born.value} onChange={born.onChange} />
        <br />
        height:
        <input
          type={height.type}
          value={height.value}
          onChange={height.onChange}
        />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

export default App
 */
// =========================== 6 =========================== //

import { useField } from './hooks'

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

export default App
