import { useMutation, useQueryClient } from 'react-query'

import { createAnecdote } from '../requests'
import { useSetNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: ({ response }) => {
      const notification = response.data.error
      setNotification(notification)
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    await newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('Error', newAnecdoteMutation.status)
    console.log('Success', newAnecdoteMutation.isSuccess)
    setNotification(`anecdote '${content}' created`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
