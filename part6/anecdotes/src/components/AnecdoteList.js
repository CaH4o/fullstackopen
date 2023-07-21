import { useSelector, useDispatch } from 'react-redux'

import { voting } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const sortByVoteDesc = (a, b) => b.votes - a.votes

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((a) => a.content.includes(filter))
  }).sort(sortByVoteDesc)

  const vote = (anecdote) => {
    dispatch(voting(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
