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
