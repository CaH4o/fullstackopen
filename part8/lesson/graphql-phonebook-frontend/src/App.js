// ================================ 2-1 ================================ //
/* 
import { gql, useQuery } from '@apollo/client'

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return <div>{result.data.allPersons.map((p) => p.name).join(', ')}</div>
}

export default App
 */
// ================================ 2-2 ================================ //
/* 
import { gql, useQuery } from '@apollo/client'

import Persons from './components/Persons'

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return <Persons persons={result.data.allPersons} />
}

export default App
 */
// ================================ 2-3 ================================ //
/* 
import { gql, useQuery } from '@apollo/client'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

const App = () => {
  // ========= 2-3-1 ========= //
     
  //const result = useQuery(ALL_PERSONS, {
  //  pollInterval: 2000,
  //}) 

  // ========= 2-3-2 ========= //
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  )
}

export default App
 */
// ================================= 3 ================================= //
/* 
import { useQuery } from '@apollo/client'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries'

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  )
}

export default App
 */
// ================================= 4 ================================= //
/* 
import { useState } from 'react'
import { useQuery } from '@apollo/client'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import { ALL_PERSONS } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
    </div>
  )
}

export default App
 */
// ================================= 5 ================================= //
/* 
import { useState } from 'react'
import { useQuery } from '@apollo/client'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import Notify from './components/Notify'
import { ALL_PERSONS } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App
 */
// ================================= 6 ================================= //
/* 
import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'

import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App
 */

// ================================= 7 ================================= //

import { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS, PERSON_ADDED } from './queries'

export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      console.log(data)
    },
  })

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)

      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App
