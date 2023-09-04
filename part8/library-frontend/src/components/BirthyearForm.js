import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const style = { width: 200, margin: '0.5rem' }

const BirthyearForm = ({ authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      console.log(messages)
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    editBirthyear({
      variables: { name: name.value, setBornTo: Number(born) },
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div style={style}>
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm
